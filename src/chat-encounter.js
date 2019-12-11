import React, { useEffect, useRef } from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";

export function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector(state => state && state.chatMessages);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            socket.emit("my msg", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="Chat">
            <h1>Chat Room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msg => (
                        <div key={msg.id}>
                            <p>
                                <img
                                    src={msg.image_url}
                                    className="chat-logo"
                                />
                                {msg.first_name} {msg.last_name}: {msg.message}
                            </p>
                            <p className="chat-time">sent {msg.created_at}</p>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add your message here.."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
