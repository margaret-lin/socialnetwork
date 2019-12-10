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

exports.acceptFriendRequest = function acceptFriendRequest(
    receiverId,
    senderId
) {
    return db.query(
        "UPDATE friendships SET accepted = TRUE WHERE receiver_id = $1 AND sender_id = $2 RETURNING *",
        [receiverId, senderId]
    );
};

exports.cancelFriendRequest = function cancelFriendRequest(
    receiverId,
    senderId
) {
    return db.query(
        "DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)",
        [receiverId, senderId]
    );
};

exports.getFriendAndWannabes = function getFriendAndWannabes(id) {
    return db.query(
        "SELECT users.id, first_name, last_name, image_url, accepted FROM friendships JOIN users ON (accepted = false AND receiver_id = $1 AND sender_id = users.id) OR (accepted = true AND receiver_id = $1 AND sender_id = users.id) OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)",
        [id]
    );
};

exports.getLastTenChatMessages = function getLastTenChatMessages() {
    return db.query(
        "select chats.id, chats.message, chats.sender_id, chats.created_at, users.first_name, users.last_name, users.image_url from chats join users on chats.sender_id = users.id order by created_at desc limit 10;"
    );
};

exports.sendChatMessage = function sendChatMessage(id, msg) {
    return db.query(
        "INSERT INTO chats (sender_id, message) VALUES ($1, $2) RETURNING *",
        [id, msg]
    );
};

// "SELECT users.id, first_name, last_name, image_url, accepted FROM users RIGHT JOIN chats ON (users.id = chats.sender_id)",
