import axios from "./axios";
import { init } from "./socket";

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
// export async function loadMessages() {
//     init(data => {
//         return {
//             type: "LOAD_MESSAGES",
//             chatMessages: data
//         };
//     });
// }

export async function chatMessages(messages) {
    console.log("YES!!! all chatMessages", messages);

    return {
        type: "LOAD_MESSAGES",
        chatMessages: messages
    };
}

export async function chatMessage(message) {
    console.log("YES!!! new chatMessage");

    return {
        type: "UPDATE_MESSAGES",
        newMessage: message
    };
}

export async function loadMessages() {
    // try {
    //     // const { data } = await socket.on("chatMessages");
    //     // console.log("loadMessage data is: ", data);
    //     return {
    //         type: "LOAD_MESSAGES",
    //         chatMessages: data
    //     };
    // } catch (err) {
    //     console.log("err in loadMessages..", err);
    // }
}
