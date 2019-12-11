import React, { useEffect, useRef } from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Notification() {
    const notification = useSelector(state => state && state.notification);

    return (
        <div className="notif-box">
            <p>hey you have got a new friend request!</p>
            {notification &&
                notification.map(elem => (
                    <div key={elem.id}>
                        <p>
                            Go to
                            <Link to="/friends" className="link">
                                Friends
                            </Link>
                        </p>
                        <p>Ok, got it!</p>
                    </div>
                ))}
        </div>
    );
}
