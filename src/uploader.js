import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            file: null
        };
        this.selectImage = this.selectImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    uploadImage(e) {
        e.preventDefault();
        let fd = new FormData();
        fd.append("file", this.state.file);
        axios
            .post("/upload", fd)
            .then(res => {
                console.log("uploadImage successful: ", res);
            })
            .catch(err => console.log("error in uploadImage", err));
    }

    selectImage(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <div>
                <h3>I'm the Uploader!</h3>
                <input
                    onChange={this.selectImage}
                    type="file"
                    name="file"
                    accept="image/*"
                />
                <button onClick={this.uploadImage}>upload</button>
            </div>
        );
    }
}
