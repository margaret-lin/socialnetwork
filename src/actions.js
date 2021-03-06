import axios from "./axios";

export async function friendsWannabes() {
    try {
        const { data } = await axios.get("/friends-wannabes");
        return {
            type: "RECEIVE_FRIENDS",
            friends: data
        };
    } catch (err) {
        console.log("err in friendswannabes...", err);
    }
}

export async function acceptFriendRequest(id) {
    try {
        await axios.post("/friendshipstatus/" + id);
        return {
            type: "ACCEPT_FRIENDS",
            accepted: true,
            id
        };
    } catch (e) {
        console.log("err in accept-friendship", e);
    }
}

export async function unfriend(id) {
    try {
        await axios.post("/friendshipstatus/" + id);
        return {
            type: "UNFRIEND",
            id
        };
    } catch (err) {
        console.log("err in end-friendship", err);
    }
}

export async function chatMessages(messages) {
    return {
        type: "LOAD_MESSAGES",
        chatMessages: messages
    };
}

export async function chatMessage(message) {
    return {
        type: "LOAD_MESSAGES",
        chatMessages: message
    };
}

export async function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        onlineUsers: users
    };
}

export async function connectedUser(user) {
    return {
        type: "CONNECTED_USER",
        connectedUser: user
    };
}

export async function disconnectUser(userId) {
    return {
        type: "DISCONNECT_USER",
        disconnectUser: userId
    };
}

export async function notification(user) {
    return {
        type: "SHOW_NOTIFICATION",
        user: user
    };
}
