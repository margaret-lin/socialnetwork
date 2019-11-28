import React from "react";

export function ProfilePic({ firstName, profilePicUrl, lastName }) {
    // if there is no profilePicUrl, set it to default url
    profilePicUrl = profilePicUrl || "/img/default.png";
    return (
        <div>
            <h2>I'm the Profile Pic! {firstName}</h2>;
            <img src={profilePicUrl} />
        </div>
    );
}
