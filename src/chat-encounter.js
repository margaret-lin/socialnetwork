import React, { useEffect, useRef } from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector(state => state && state.chatMessages);
    const chatMessage = useSelector(state => state && state.chatMessages);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = e => {
        if (e.key === "Enter") {
            console.log("e.target.value: ", e.target.value);
            console.log("e.key ", e.key);
            socket.emit("My amazing chat msg", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="Chat">
            <h1>Chat Room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages.map(msg => (
                    <p key={msg.id}>
                        <img src={msg.image_url} className="chat-logo" />
                        {msg.first_name} {msg.last_name}: {msg.message}
                    </p>
                ))}
                {/* {chatMessage.map(msg => (
                    <p key={msg.id}>
                        <img src={msg.image_url} className="chat-logo" />
                        {msg.first_name} {msg.last_name}: {msg.message}
                    </p>
                ))} */}
            </div>
            <textarea
                placeholder="Add your message here.."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
