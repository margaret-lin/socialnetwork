import React from "react";

export function ProfilePic({
    firstName,
    lastName,
    profilePicUrl,
    toggleModal
}) {
    profilePicUrl = profilePicUrl || "/default.png";
    const fullName = firstName + " " + lastName;

    return (
        <div>
            <h2>I'm the Profile Pic!</h2>
            <img
                src={profilePicUrl}
                className="user-profile-picture"
                alt={fullName}
                onClick={toggleModal}
            />
        </div>
    );
}
