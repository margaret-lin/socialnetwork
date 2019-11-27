import React from "react";

import { Link } from "react-router-dom";

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <Link to="/">Take me to registration!</Link>
            </div>
        );
    }
}
