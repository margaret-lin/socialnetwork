import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.uploadImage("testing");
    }

    uploadImage(e) {
        //     e.preventDefault();
        //     let fd = new FormData();
        //     let me = this;
        //     fd.append("file", this.file);
        //     axios
        //         .post("/upload", fd)
        //         .then(res => {
        //             me.images.unshift(res.data.image);
        //         })
        //         .catch(err => console.log("error in post/upload", err));
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <div>
                <h3>I'm the Uploader!</h3>
            </div>
        );
    }
}
