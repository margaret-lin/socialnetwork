import React, { useState, useEffect } from "react";
import axios from "./axios";
import { socket } from "./socket";
import Button from "@material-ui/core/Button";

export function Friendshipbutton({ otherUserId, currentUserId }) {
    console.log("otherUserId in friendship button: ", otherUserId);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        console.log("button mounted!");
        axios.get(`/friendshipstatus/${otherUserId}`).then(({ data }) => {
            console.log("GET friendshipstatus data: ", data);

            setButtonText(data.buttonText);
        });
    }, []);

    function submit() {
        console.log("clicked on the button!", buttonText);
        // make a post request to 1 route, and the route does the logic to determine what type of query to make
        axios
            .post(`/friendshipstatus/${otherUserId}`, buttonText)
            .then(({ data }) => {
                if (buttonText.toLowerCase().includes("send")) {
                    socket.emit("new friend request", {
                        senderId: currentUserId,
                        receiverId: otherUserId
                    });
                }

                setButtonText(data.buttonText);
            })
            .catch(err => console.log("err in POST friendshipstatus", err));
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                className="friendship-button"
                onClick={submit}
            >
                {buttonText}
            </Button>
        </div>
    );
}
