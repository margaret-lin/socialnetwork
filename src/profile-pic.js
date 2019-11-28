import React from "react";

export function ProfilePic({ firstName, profilePicUrl, lastName }) {
    profilePicUrl = profilePicUrl || "/default.png";
    return (
        <div>
            <h2>I'm the Profile Pic! {firstName}</h2>
            <img
                src={profilePicUrl}
                className="user-profile-picture"
                alt={firstName}
            />
        </div>
    );
}
