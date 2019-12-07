import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { friendsWannabes, acceptFriendRequest, unfriend } from "./actions";

export function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friends => friends.accepted == true)
        );
    });
    const wannaBeFriends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friends => friends.accepted === false)
        );
    });

    useEffect(() => {
        dispatch(friendsWannabes());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <>
            <div className="friends">
                <h3>Your friends are: </h3>
                {friends.map(friend => (
                    <div key={friend.id}>
                        <img src={friend.image_url} />
                        <p>
                            {friend.first_name} {friend.last_name}
                        </p>
                        <button onClick={e => dispatch(unfriend(friend.id))}>
                            Unfriend
                        </button>
                    </div>
                ))}
                <h3>Who wants to be your friend:</h3>
                {wannaBeFriends.map(friend => (
                    <div key={friend.id}>
                        <img src={friend.image_url} />
                        <p>
                            {friend.first_name} {friend.last_name}
                        </p>
                        <button
                            onClick={e =>
                                dispatch(acceptFriendRequest(friend.id))
                            }
                        >
                            Accept
                        </button>
                    </div>
                ))}
            </div>
            <p>This is friend's page!</p>
        </>
    );
}
