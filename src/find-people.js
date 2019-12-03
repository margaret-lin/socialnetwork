import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FindPeople() {
    const [user, setUser] = useState([]);
    const [input, setInput] = useState("");

    console.log(user, input);

    if (!user) {
        return null;
    }

    useEffect(() => {
        let stop = false;

        (async () => {
            const { data } = await axios.get(`/users/${input}`);
            if (!stop) {
                setUser(data);
            }
        })();

        return () => {
            stop = true;
        };
    }, [input]);

    return (
        <>
            <p>Hey!!! find someone now!</p>
            <p>
                {user.firstName}
                {user.lastName}
            </p>
            <p>{user.biography}</p>
            <input type="text" onChange={e => setInput(e.target.value)} />
        </>
    );
}
