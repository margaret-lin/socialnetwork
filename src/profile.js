import React from "react";
import { ProfilePic } from "./profile-pic";
import { BioEditor } from "./bio-editor.js";

export function Profile(props) {
    return (
        <div className="container">
            <ProfilePic
                firstName={props.firstName}
                lastName={props.lastName}
                profilePicUrl={props.profilePicUrl}
                profilePicClass="profile-pic"
            />
            <h2>
                {props.firstName} {props.lastName}
            </h2>

            <BioEditor
                biography={props.biography}
                updateBiography={props.updateBiography}
            />
        </div>
    );
}
