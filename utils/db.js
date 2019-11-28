var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.createUser = function createUser(
    firstName,
    lastName,
    imageUrl,
    biography,
    email,
    password
) {
    return db.query(
        "INSERT INTO users (first_name, last_name, image_url, biography, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [firstName, lastName, imageUrl, biography, email, password]
    );
};

exports.getPassword = function getPassword(email) {
    return db.query("SELECT password, id FROM users WHERE email = $1", [email]);
};

exports.getUserInfo = function getUserInfo(id) {
    return db.query(
        "SELECT first_name, last_name, image_url FROM users where id = $1",
        [id]
    );
};

exports.updateUserImage = function updateUserImage(imageUrl, id) {
    return db.query(
        "UPDATE users SET image_url = $1 WHERE id = $2 RETURNING *",
        [imageUrl, id]
    );
};
