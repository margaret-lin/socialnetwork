import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "Margaret",
            uploaderIsVisible: null
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        console.log("App has mounted!");
        // here we are contacting the server and ask for info about the user
        //axios.get()
        // when we get the info back, we want to add it to state
        // this.setState({}
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
