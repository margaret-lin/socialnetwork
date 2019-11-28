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
        console.log("App has mounted!");
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
            // make it "diversily true"
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    methodInApp(muffin) {
        console.log("I'm a method in App");
        console.log("muffin: ", muffin);
    }

    render() {
        return (
            <div>
                {/* <h1 onClick={this.toggleModal}>Hello from App!</h1> */}
                <img src="/logo.jpg" className="logo-small" alt="Logo" />
                <h1>Hello from App!</h1>
                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
