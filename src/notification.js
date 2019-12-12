import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Notification() {
    const notification = useSelector(state => state && state.notification);
    const [visible, setVisible] = useState(true);
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    useEffect(() => show, [notification]);

    return (
        notification.length > 0 &&
        visible && (
            <div className="notif-box">
                <p onClick={hide}>X</p>
                <p>Hey you have got a new friend request!</p>
                {notification.map(user => (
                    <div key={user.id}>
                        <p>
                            <Link to={"/user/" + user.id} className="link">
                                <img
                                    className="chat-logo"
                                    src={user.image_url}
                                />
                                {user.first_name} {user.last_name}
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        )
    );
}
