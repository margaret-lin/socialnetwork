import React from "react";
import axios from "axios";
import Register from "./registration";
// import logo from "./logo.png";

export default class Welcome extends React.Component {
    render() {
        const welcomeMessage = "Welcome to ..... here!";
        // const logo = require("../logo.png");
        return (
            <div>
                {welcomeMessage}
                {/* <div className="logo">
                    <img src={logo} alt="logo" />
                </div> */}
                <Register />
            </div>
        );
    }
}
