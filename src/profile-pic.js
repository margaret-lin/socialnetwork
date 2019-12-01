import React from "react";

export function ProfilePic({
    firstName,
    lastName,
    profilePicUrl,
    toggleModal,
    profilePicClass
}) {
    profilePicUrl = profilePicUrl || "/default.png";
    const fullName = firstName + " " + lastName;

    return (
        <div>
            <img
                src={profilePicUrl}
                className={profilePicClass}
                alt={fullName}
                onClick={toggleModal}
            />
        </div>
    );
}
