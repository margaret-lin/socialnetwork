import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FindPeople() {
    const [user, setUser] = useState([]);
    const [input, setInput] = useState("");

    console.log("input: ", input);

    useEffect(() => {
        let stop = false;

        (async () => {
            const { data } = await axios.get(`/users/${input}`);
            console.log("data is", data);
            if (!stop) {
                setUser(data);
            }
        })();

        return () => {
            stop = true;
        };
    }, [input]);

    if (user) {
        return (
            <>
                <p>Find Someone!</p>
                <input type="text" onChange={e => setInput(e.target.value)} />

                <div>
                    {user.map(user => (
                        <div key={user.id}>
                            <img
                                src={user.image_url}
                                alt={`${user.first_name} ${user.last_name}`}
                            />
                            <p>
                                {user.first_name}
                                {user.last_name}
                            </p>
                            <p>{user.biography}</p>
                        </div>
                    ))}
                </div>
            </>
        );
    } else {
        return null;
    }
}
