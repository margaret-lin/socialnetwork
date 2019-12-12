import * as io from "socket.io-client";
import {
    chatMessages,
    chatMessage,
    onlineUsers,
    connectedUser,
    disconnectUser,
    notification
} from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        console.log("socket.js connected..");
        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

        socket.on("onlineUsers", users => store.dispatch(onlineUsers(users)));

        socket.on("connectedUser", user => store.dispatch(connectedUser(user)));

        socket.on("disconnectUser", user =>
            store.dispatch(disconnectUser(user))
        );

        // socket.on("notification", elem => store.dispatch(notification(elem)));
    }
};
