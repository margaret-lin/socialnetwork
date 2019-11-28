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

app.get("/user", (req, res) => {
    // console.log("userId..", req.session.userId);
    db.getUserInfo(req.session.userId)
        .then(({ rows }) => {
            console.log("made it to app.get/user getUserInfo!");
            res.json({
                firstName: rows[0].first_name,
                lastName: rows[0].last_name,
                imageUrl: rows[0].image_url
            });
        })
        .catch(err => console.log("error in app.get/user...", err));
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // const { title, description, username } = req.body;
    const imageUrl = `${s3Url}${req.file.filename}`;
    console.log("imageUrl: ", imageUrl);

    // db.uploadImage(title, description, username, imageUrl).then(({ rows }) => {
    //     console.log("image rows", rows);
    //     res.json({
    //         image: rows[0]
    //     });
    // });
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
