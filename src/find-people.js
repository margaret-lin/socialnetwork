import React, { useState, useEffect } from "react";
import Axios from "axios";

export function FindPeople() {
    const [users, setUsers] = useState({
        firstName: "",
        lastName: "",
        profilePicUrl: ""
    });
    const [input, setInput] = useState("");

    useEffect(() => {
        async () => {
            const { data } = await axios.get("/users.json");
            setUsers(data);
        };
    });

    return (
        <>
            <p>
                {users.firstName}
                {users.lastName}
            </p>
            <p>{users.bio}</p>
            <input type="text" />
        </>
    );
}
