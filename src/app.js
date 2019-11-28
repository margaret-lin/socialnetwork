import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            profilePicUrl: "",
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
                profilePicUrl: this.state.profilePicUrl
            })
            .then(({ data }) => {
                console.log("axios/get sucess made it to setState!", data);
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profilePicUrl: data.imageUrl
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
        return (
            <div>
                <img src="/logo.jpg" className="logo-small" alt="Logo" />
                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                />
                <button onClick={this.toggleModal}>
                    change your profile..
                </button>

                {this.state.uploaderIsVisible && (
                    <Uploader refreshProfilePic={this.refreshProfilePic} />
                )}
            </div>
        );
    }
}
