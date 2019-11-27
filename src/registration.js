import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";


export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit(registrationForm) {
        registrationForm.preventDefault();
        axios
            .post("/register", {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
            .then(({ data }) => {
                console.log("data", data);
                location.replace("/");
            })
            .catch(err => {
                console.log("err in axios/register", err);
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
            <div className="registration-field">
                <p>Join Slow Food Nation!</p>
                    {this.state.error && <div className="error">Opps!</div>}
                <div className="input-field">
                    <input
                        name="firstName"
                        placeholder="First name"
                        onChange={e => this.handleChange(e.target)}
                    />{'\n'}
                    <label>First Name</label>
                </div>
                <div className="input-field">
                    <input
                        name="lastName"
                        placeholder="Last name"
                        onChange={e => this.handleChange(e.target)}
                    />{'\n'}
                    <label>Last Name</label>
                </div>
                <div className="input-field">
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={e => this.handleChange(e.target)}
                    />{'\n'}
                    <label>Email</label>
                </div>
                <div className="input-field">
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={e => this.handleChange(e.target)}
                    />{'\n'}
                    <label>Password</label>
                </div>
                <div>
                    <button onClick={e => this.submit(e)}>Submit</button>
                </div>
                <div>
                    <Link to="/login">or login!</Link>
                </div>
            </div>
        );
    }
}
