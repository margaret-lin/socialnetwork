import React from "react";
import axios from "axios";

export default class Register extends React.Component {
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
                <div className="firstName">
                    {this.state.error && <div className="error">Opps!</div>}
                    <label>First Name:</label>
                    <input
                        name="firstName"
                        placeholder="First name"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <div className="lastName">
                    <label>Last Name:</label>
                    <input
                        name="lastName"
                        placeholder="Last name"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <div className="email">
                    <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <div className="password">
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <button onClick={e => this.submit(e)}>Submit</button>
            </div>
        );
    }
}
