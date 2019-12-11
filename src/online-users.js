import React, { useEffect, useRef } from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function OnlineUsers() {
    const onlineUsers = useSelector(state => state && state.onlineUsers);

    useEffect(() => {
        socket.emit("who are online");
    }, []);

    return (
        <div className="online-container">
            <p>See who is online...</p>
            {onlineUsers &&
                onlineUsers.map(user => (
                    <div key={user.id}>
                        <img src={user.image_url} className="chat-logo" />
                        {user.first_name} {user.last_name}
                    </div>
                ))}
        </div>
    );
}
