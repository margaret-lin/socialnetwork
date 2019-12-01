import React from "react";
import { ProfilePic } from "./profile-pic";
import { BioEditor } from "./bio-editor.js";

export function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="container">
            <h1>I am the profile component! {props.firstName}</h1>

            <ProfilePic
                firstName={props.firstName}
                lastName={props.lastName}
                profilePicUrl={props.profilePicUrl}
                profilePicClass="profile-pic"
            />

            <BioEditor biography={props.biography} />
        </div>
    );
}
