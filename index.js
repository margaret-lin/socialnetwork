const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bc");

app.use(express.urlencoded({ extended: false }));

app.use(
    cookieSession({ secret: `my secret`, maxAge: 1000 * 60 * 60 * 24 * 14 })
);

app.use(express.static("./public"));

app.use(compression());

app.use(express.json());

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
                res.json(rows);
            })
            .catch(err => console.log("err in app.post /register", err))
    );
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

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.get("*", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.listen(8080, function() {
    console.log("I'm listening....!!👂");
});
