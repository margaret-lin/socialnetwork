import React, { useState, useEffect } from "react";
import axios from "./axios";

export function Friendshipbutton({ otherId }) {
    console.log("otherId in friendship button: ", otherId);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        console.log("button mounted!");
        axios.get(`/friendshipstatus/${otherId}`).then(({ data }) => {
            console.log("GET friendshipstatus data: ", data);

            setButtonText(data.buttonText);
        });
    }, []);

    function submit() {
        console.log("clicked on the button!", buttonText);
        // make a post request to 1 route, and the route does the logic to determine what type of query to make
        axios
            .post(`/friendshipstatus/${otherId}`, buttonText)
            .then(({ data }) => {
                console.log("POST friendshipstatus data: ", data);
                setButtonText(data.buttonText);

                if (buttonText === "Send Friend Request") {
                    console.log("Friend request sent!");
                    buttonText === "Cancel Friend Request";
                }
            })
            .catch(err => console.log("err in POST friendshipstatus", err));
    }

    return (
        <div>
            <p>hey im friendship button</p>
            <button className="friendship-button" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
