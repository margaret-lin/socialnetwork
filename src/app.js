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
        this.updateBiography = this.updateBiography.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
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

    updateBiography(bioText) {
        console.log("biography text is: ", bioText);
        this.setState({
            biography: bioText
        });
    }

    render() {
        // make sure not to display until data arrives...
        if (!this.state.firstName) {
            return null;
        }
        return (
            <div>
                <div id="nav-bar">
                    <img src="/logo.jpg" className="logo-small" alt="Logo" />
                    <ProfilePic
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        profilePicUrl={this.state.profilePicUrl}
                        toggleModal={this.toggleModal}
                        profilePicClass="small-profile-pic"
                    />
                </div>

                <Profile
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    biography={this.state.biography}
                    updateBiography={this.updateBiography}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader refreshProfilePic={this.refreshProfilePic} />
                )}
            </div>
        );
    }
}

// updateBio() passes down to Profile, pass down to Bioedit
