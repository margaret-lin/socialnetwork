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
    return db.query("SELECT * FROM users where id = $1", [id]);
};

exports.updateUserImage = function updateUserImage(imageUrl, id) {
    return db.query(
        "UPDATE users SET image_url = $1 WHERE id = $2 RETURNING *",
        [imageUrl, id]
    );
};

exports.updateUserBio = function updateUserBio(biography, id) {
    return db.query(
        "UPDATE users SET biography = $1 WHERE id = $2 RETURNING *",
        [biography, id]
    );
};

exports.getOtherUsers = function getOtherUsers(firstName) {
    return db.query(
        "SELECT * FROM users WHERE first_name ILIKE $1 ORDER BY id DESC LIMIT 3",
        [firstName + "%"]
    );
};

exports.showOtherUsers = function showOtherUsers() {
    return db.query("SELECT * FROM users ORDER BY id DESC LIMIT 3");
};

exports.checkFriendshipstatus = function checkFriendshipstatus(
    receiverId,
    senderId
) {
    return db.query(
        "SELECT * FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)",
        [receiverId, senderId]
    );
};

exports.sendFriendRequest = function sendFriendRequest(receiverId, senderId) {
    return db.query(
        "INSERT INTO friendships (receiver_id, sender_id) VALUES ($1, $2) RETURNING *",
        [receiverId, senderId]
    );
};
