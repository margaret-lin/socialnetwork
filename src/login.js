import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit(loginInfo) {
        loginInfo.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    console.log("data login success!");
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(err => {
                console.log("err in axios/login", err);
                this.setState({ error: true });
            });
    }

    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                {this.state.error && <div className="error">Opps!</div>}
                <div className="login-field">
                    <div className="input-field">
                        <input
                            name="email"
                            type="email"
                            placeholder="email"
                            onChange={e => this.handleChange(e.target)}
                        />
                        {"\n"}
                        <label>Email</label>
                    </div>
                    <div className="input-field">
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={e => this.handleChange(e.target)}
                        />
                        {"\n"}
                        <label>Password</label>
                    </div>
                </div>
                <div>
                    <button onClick={e => this.submit(e)}>Next</button>
                </div>
                <div>
                    <Link to="/" className="link">
                        Go back to registration!
                    </Link>
                </div>
            </div>
        );
    }
}
