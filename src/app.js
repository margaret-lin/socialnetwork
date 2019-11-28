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
        this.uploadImage = this.uploadImage.bind(this);
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

    uploadImage(e) {
        // e.preventDefault();
        // let fd = new FormData();
        // let me = this;
        // fd.append("file", this.file);
        // axios
        //     .post("/upload", fd)
        //     .then(res => {
        //         me.images.unshift(res.data.image);
        //     })
        //     .catch(err => console.log("error in post/upload", err));
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

                {this.state.uploaderIsVisible && (
                    <Uploader uploadImage={this.uploadImage} />
                )}
            </div>
        );
    }
}
