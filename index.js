const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

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
    res.status(200);
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
