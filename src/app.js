import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";
import { Profile } from "./profile";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            profilePicUrl: "",
            biography: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.refreshProfilePic = this.refreshProfilePic.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                profilePicUrl: this.state.profilePicUrl,
                biography: this.state.biography
            })
            .then(({ data }) => {
                console.log("axios/get sucess made it to user/setState!", data);
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profilePicUrl: data.profilePicUrl,
                    biography: data.biography
                });
            });
    }

    toggleModal() {
        console.log("toggle modal is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    refreshProfilePic(newImageUrl) {
        console.log("new image url", newImageUrl);
        this.setState({
            profilePicUrl: newImageUrl,
            uploaderIsVisible: false
        });
    }

    render() {
        // make sure not to display until data arrives...
        if (!this.state.firstName) {
            return null;
        }
        return (
            <div>
                <img src="/logo.jpg" className="logo-small" alt="Logo" />
                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    toggleModal={this.toggleModal}
                    profilePicClass="small-profile-pic"
                />

                <Profile
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    biography={this.state.biography}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader refreshProfilePic={this.refreshProfilePic} />
                )}
            </div>
        );
    }
}

// updateBio() passes down to Profile, pass down to Bioedit
