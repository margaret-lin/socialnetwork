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
                // can also put the value as ''
                email: this.state.email,
                password: this.state.password,
                first: this.state.first
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            });
    }
    // like the v-modal in vue, to monior user's input?
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
        //or can also do... and email: this.email for example
        this[inputELement.name] = inputElement.value;
    }
    render() {
        const first = "First Name: ";
        const last = "Last Name: ";
        const email = "Email: ";
        const password = "Password: ";

        return (
            <div>
                <div className="first">
                    {this.state.error && <div className="error">Opps!</div>}
                    {first}
                    <input
                        name="first"
                        placeholder="first name"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <div className="last">
                    {last}
                    <input
                        name="last"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <div className="email">
                    {email}
                    <input
                        name="email"
                        type="email"
                        onChange={e => this.handleChange(e.target)}
                    />
                </div>
                <div className="password">
                    {password}
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
