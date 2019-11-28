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
            uploaderIsVisible: null
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(userInfo) {
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

    onChange(e) {
        this.setState({ file: e.target.files[0] });
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

                {this.state.uploaderIsVisible && <Uploader />}
            </div>
        );
    }
}
