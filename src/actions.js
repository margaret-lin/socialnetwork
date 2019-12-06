import axios from "./axios";

export async function friendsWannabes() {
    try {
        const { data } = await axios.get("/friends-wannabes");
        console.log("friendsWannabes is: ", data);
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
