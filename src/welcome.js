import React from "react";
import axios from "axios";
import Register from "./registration";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to</h1>
                <img src="logo.jpg" alt="logo" className="logo" />
                <Register />
            </div>
        );
    }
}
