const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3/s3");
const { s3Url } = require("./s3/config");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
    cookieSession({ secret: `my secret`, maxAge: 1000 * 60 * 60 * 24 * 14 })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static("./public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/register", (req, res) => {
    hash(req.body.password).then(hashedPassword =>
        db
            .createUser(
                req.body.firstName,
                req.body.lastName,
                req.body.imageUrl,
                req.body.biography,
                req.body.email,
                hashedPassword
            )
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                res.json({
                    success: true
                });
            })
            .catch(err => console.log("err in app.post /register", err))
    );
});

app.post("/login", (req, res) => {
    let email = req.body.email;
    let inputPassword = req.body.password;

    db.getPassword(email)
        .then(({ rows }) => {
            let hashedPassword = rows[0].password;
            req.session.userId = rows[0].id;

            compare(inputPassword, hashedPassword).then(match => {
                if (match) {
                    res.json({
                        success: true
                    });
                } else {
                    res.json({
                        error: true
                    });
                }
            });
        })
        .catch(err => console.log("err in compare pwd", err));
});

app.get("/user.json", (req, res) => {
    db.getUserInfo(req.session.userId)
        .then(({ rows }) => {
            res.json(createUserResponse(rows[0]));
        })
        .catch(err => console.log("error in app.get/user...", err));
});

app.get("/users/:firstName", (req, res) => {
    let { firstName } = req.params;

    console.log("users req.body: ", firstName);

    db.getOtherUsers(firstName)
        .then(({ rows }) => {
            // console.log("successful made it to getOtherUsers!");
            // console.log("db.getOtherUsers result; ", rows);

            if (rows[0]) {
                res.json(rows);
            }
        })
        .catch(err => console.log("err in app.get/users:getOtherUsers", err));
});

app.get("/users", (req, res) => {
    db.showOtherUsers()
        .then(({ rows }) => {
            console.log("successful made it to showOtherUsers");
            console.log("db.showOtherUsers result; ", rows);

            res.json(rows);
        })
        .catch(err => console.log("err in app.get/USERS", err));
});

app.get("/user/:id.json", (req, res) => {
    let { id } = req.params;
    console.log("req. body other profile is: ", req.body);

    db.getUserInfo(id)
        .then(({ rows }) => {
            console.log(
                "app.get: get other user profile is successful!!",
                rows
            );
            rows[0].userId = req.session.userId;
            res.json(createUserResponse(rows[0]));
        })
        .catch(err => console.log("error in app.get/user/:id...", err));
});

app.get("/friendshipstatus/:otherUserId", (req, res) => {
    let { otherUserId } = req.params;
    let currentUserId = req.session.userId;

    db.checkFriendshipstatus(otherUserId, currentUserId)
        .then(({ rows }) => {
            console.log("app.get:get to friendshipstatus", rows);

            const none = !rows[0];
            const pending = rows[0] && !rows[0].accepted;
            const accepted = rows[0] && rows[0].accepted;

            // check if someone sent logged in user a request
            if (!none && currentUserId === rows[0].receiver_id) {
                if (pending) {
                    res.json({ buttonText: "Accept Friend Request" });
                }
                if (accepted) {
                    res.json({ buttonText: "Unfriend" });
                }
            } else {
                // check if logged in user's sent request is accepted
                if (none) {
                    res.json({
                        buttonText: "Send Friend Request"
                    });
                }
                if (pending) {
                    res.json({ buttonText: "Cancel Friend Request" });
                }
                if (accepted) {
                    res.json({ buttonText: "Unfriend" });
                }
            }
        })
        .catch(err => console.log("err in app.get/friendshipstatus", err));
});

app.post("/friendshipstatus/:otherUserId", (req, res) => {
    let { otherUserId } = req.params;
    let currentUserId = req.session.userId;

    db.checkFriendshipstatus(otherUserId, currentUserId)
        .then(({ rows }) => {
            const none = !rows[0];
            const pending = rows[0] && !rows[0].accepted;
            const accepted = rows[0] && rows[0].accepted;

            // check if someone sent logged in user a request
            if (!none && currentUserId === rows[0].receiver_id) {
                if (pending) {
                    db.acceptFriendRequest(currentUserId, otherUserId).then(
                        () => {
                            res.json({
                                buttonText: "Unfriend",
                                receiver_id: currentUserId,
                                sender_id: otherUserId
                            });
                        }
                    );
                }
                if (accepted) {
                    db.cancelFriendRequest(currentUserId, otherUserId).then(
                        () =>
                            res.json({
                                // unfriend
                                buttonText: "Send Friend Request",
                                receiver_id: currentUserId,
                                sender_id: otherUserId
                            })
                    );
                }
            } else {
                if (none) {
                    db.sendFriendRequest(otherUserId, currentUserId)
                        .then(() =>
                            res.json({
                                buttonText: "Cancel Friend Request",
                                receiver_id: currentUserId,
                                sender_id: otherUserId
                            })
                        )
                        .catch(err =>
                            console.log("err in app.post/friendshipstatus", err)
                        );
                }
                if (pending) {
                    db.cancelFriendRequest(currentUserId, otherUserId).then(
                        () =>
                            res.json({
                                // cancel friend request
                                buttonText: "Send Friend Request",
                                receiver_id: currentUserId,
                                sender_id: otherUserId
                            })
                    );
                }
                if (accepted) {
                    db.cancelFriendRequest(otherUserId, currentUserId).then(
                        () =>
                            res.json({
                                // unfriend
                                buttonText: "Send Friend Request",
                                receiver_id: currentUserId,
                                sender_id: otherUserId
                            })
                    );
                }
            }
        })
        .catch(err => console.log("err in app.get/friendshipstatus", err));
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;
    console.log("imageUrl: ", imageUrl);

    db.updateUserImage(imageUrl, req.session.userId)
        .then(({ rows }) => {
            console.log("updateUserImage successful!!", rows);
            res.json(createUserResponse(rows[0]));
        })
        .catch(err => console.log("err in updateUserImage back: ", err));
});

app.post("/update-bio", (req, res) => {
    console.log("req.body update-bio is: ", req.body);
    db.updateUserBio(req.body.biography, req.session.userId)
        .then(({ rows }) => {
            console.log("app.post: update biography is successful!", rows);
            if (rows[0]) res.json(createUserResponse(rows[0]));
        })
        .catch(err => console.log("err in app.post/update-bio", err));
});

app.get("/welcome", (req, res) => {
    if (req.session && req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", (req, res) => {
    if (req.session && !req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening....!!👂");
});

function createUserResponse(dbUser) {
    return {
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        profilePicUrl: dbUser.image_url,
        biography: dbUser.biography,
        userId: dbUser.userId
    };
}
