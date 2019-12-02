import React from "react";
import axios from "./axios";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            profilePicUrl: "",
            biography: ""
        };
    }

    componentDidMount() {
        // figure out the id of the user...
        console.log("this.props.match.params.id: ", this.props.match.params.id);

        // make a a request to the server, passing along this props.match.params.id
        // this server needs to look up the data about that user
        // and send back information about the currently logged in user
        axios
            .get(`/user.json/${this.props.match.params.id}`)
            .then(({ data }) => {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profilePicUrl: data.profilePicUrl,
                    biography: data.biography
                });
            });

        // not letting user to see his own profile
        // set a conddition to see if other users id is the same as the logged in user id
        if (this.props.match.params.id == 6) {
            this.props.history.push("/");
        }
    }

    render() {
        // const fullName = firstName + " " + lastName;
        return (
            <div>
                <h1>This is Other Profile!</h1>
                <p>The current user ID is: {this.props.match.params.id}</p>
                <div>
                    <img
                        src={this.state.profilePicUrl}
                        alt={this.state.firstName}
                    />
                    <p>{this.state.firstName}</p>
                    <p>{this.state.lastName}</p>
                    <p>{this.state.biography}</p>
                </div>
            </div>
        );
    }
}
