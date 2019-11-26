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
