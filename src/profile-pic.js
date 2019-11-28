import React from "react";

export function ProfilePic({ firstname, profilePicUrl, lastName }) {
    console.log("props in ProfilePic: ", props);

    // if there is no profilePicUrl, set it to default url
    profilePicUrl = profilePicUrl || "/img/default.png";
    return (
        <div>
            <h2>I'm the Profile Pic! {firstName}</h2>;
            <img src={profilePicUrl} />
        </div>
    );
}
