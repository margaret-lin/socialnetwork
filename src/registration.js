import React from "react";
import axios from "axios";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit() {
        axios
            .post("/register", {
                email: this.state.email,
                password: this.state.password,
                first: this.state.first,
                last: this.state.last
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
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
                <div className="first">
                    {this.state.error && <div className="error">Opps!</div>}
                    <label>First Name:</label>
                    <input
                        name="first"
                        placeholder="first name"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <div className="last">
                    <label>Last Name:</label>
                    <input
                        name="last"
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
                <button onClick={e => this.submit()}>Submit</button>
            </div>
        );
    }
}
