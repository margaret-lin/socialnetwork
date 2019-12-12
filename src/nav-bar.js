import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import { Link } from "react-router-dom";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="nav-bar">
                <img src="/logo.jpg" className="logo-small" alt="Logo" />
                <Link to="/friends">friends</Link>
                <Link to="/findpeople">find Friends</Link>
                <Link to="/chat">Chat</Link>
                <Link to="/onlineusers">Online Users</Link>
                <p>Logout</p>

                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    toggleModal={this.toggleModal}
                    profilePicClass="small-profile-pic"
                />
            </div>
        );
    }
}
