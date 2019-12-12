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
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(compression());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

app.post("/register", async (req, res) => {
    // try {
    //     let hash = await hash(req.body.password);
    //     let id = await db.createUser(
    //         req.body.firstName,
    //         req.body.lastName,
    //         req.body.imageUrl,
    //         req.body.biography,
    //         req.body.email,
    //         hash
    //     );
    //     req.session.userId = id;
    //     res.json({
    //         success: true
    //     });
    // } catch (err) {
    //     console.log("err in app.post /register", err);
    // }

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

app.post("/login", async (req, res) => {
    let email = req.body.email;
    let inputPassword = req.body.password;

    // try {
    //     let { rows } = await db.getPassword(email);
    //     let hashedPassword = rows[0].password;
    //     req.session.userId = rows[0].id;
    //     let match = await compare(inputPassword, hashedPassword);

    //     if (match) {
    //         res.json({
    //             success: true
    //         });
    //     } else {
    //         res.json({
    //             error: true
    //         });
    //     }
    // } catch {
    //     console.log("err in compare pwd", err);
    // }

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

app.get("/users/:firstName.json", (req, res) => {
    let { firstName } = req.params;

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
            res.json(rows);
        })
        .catch(err => console.log("err in app.get/USERS", err));
});

app.get("/user/:id.json", (req, res) => {
    let { id } = req.params;

    db.getUserInfo(id)
        .then(({ rows }) => {
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
            const none = !rows[0];
            const pending = rows[0] && !rows[0].accepted;
            const accepted = rows[0] && rows[0].accepted;

            if (!none && currentUserId === rows[0].receiver_id) {
                if (pending) {
                    res.json({ buttonText: "Accept Friend Request" });
                }
                if (accepted) {
                    res.json({ buttonText: "Unfriend" });
                }
            } else {
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

            if (!none && currentUserId === rows[0].receiver_id) {
                if (pending) {
                    acceptFriendRequest(currentUserId, otherUserId, res);
                }
                if (accepted) {
                    unfriendOrCancel(currentUserId, otherUserId, res);
                }
            } else {
                if (none) {
                    sendFriendRequest(currentUserId, otherUserId, res);
                }
                if (pending) {
                    unfriendOrCancel(currentUserId, otherUserId, res);
                }
                if (accepted) {
                    unfriendOrCancel(otherUserId, currentUserId, res);
                }
            }
        })
        .catch(err => console.log("err in app.get/friendshipstatus", err));
});

app.get("/friends-wannabes", (req, res) => {
    db.getFriendAndWannabes(req.session.userId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(err => console.log("err in app.get friends-wannabes", err));
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;

    db.updateUserImage(imageUrl, req.session.userId)
        .then(({ rows }) => {
            res.json(createUserResponse(rows[0]));
        })
        .catch(err => console.log("err in updateUserImage back: ", err));
});

app.post("/update-bio", (req, res) => {
    db.updateUserBio(req.body.biography, req.session.userId)
        .then(({ rows }) => {
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

server.listen(8080, function() {
    console.log("I'm listening....!!👂");
});

let onlineUsers = {};

io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    onlineUsers[socket.id] = userId;

    console.log("onlineUser", onlineUsers);

    db.getLastTenChatMessages().then(({ rows }) => {
        io.sockets.emit("chatMessages", rows.reverse());
    });

    socket.on("my msg", msg => {
        db.sendChatMessage(userId, msg).then(() => {
            db.getLastTenChatMessages().then(({ rows }) => {
                io.sockets.emit("chatMessage", rows.reverse());
            });
        });
    });

    socket.on("who are online", () => {
        let ids = Object.values(onlineUsers);
        console.log("id is", ids);

        db.getUserList(ids)
            .then(({ rows }) => {
                console.log("onlineuser rows: ", rows);
                io.sockets.emit("onlineUsers", rows);
            })
            .catch(err => console.log("err in socket on getUserList", err));
    });

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
        if (!Object.values(onlineUsers).includes(userId)) {
            io.sockets.emit("disconnectUser", userId);
        }
    });

    // socket.on("notification", () => console.log("socket notification is on.."));
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

function acceptFriendRequest(currentUserId, otherUserId, res) {
    db.acceptFriendRequest(currentUserId, otherUserId).then(() => {
        res.json({
            buttonText: "Unfriend"
        });
    });
}

function unfriendOrCancel(currentUserId, otherUserId, res) {
    db.cancelFriendRequest(currentUserId, otherUserId).then(() =>
        res.json({
            buttonText: "Send Friend Request"
        })
    );
}

function sendFriendRequest(receiverId, senderId, res) {
    db.sendFriendRequest(senderId, receiverId)
        .then(() =>
            res.json({
                buttonText: "Cancel Friend Request"
            })
        )
        .catch(err => console.log("err in app.post/friendshipstatus", err));
}
