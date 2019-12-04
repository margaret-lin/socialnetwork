import React from "react";
import axios from "./axios";
import { Friendshipbutton } from "./friendship-button";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // figure out the id of the user...
        // console.log("this.props.match.params.id: ", this.props.match.params.id);

        axios
            .get(`/user/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                // console.log("user other data", data);
                this.setState({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profilePicUrl: data.profilePicUrl,
                    biography: data.biography,
                    userId: data.userId
                });

                console.log("current userId is", this.state.userId);

                if (this.props.match.params.id == this.state.userId) {
                    this.props.history.push("/");
                }
            })
            .catch(err => console.log("err in axios.get/otherprofile!", err));
    }

    render() {
        // const fullName = firstName + " " + lastName;
        if (!this.state.firstName) {
            return (
                <div>
                    <p>this user doesn't exist</p>
                </div>
            );
        }

        return (
            <div>
                <h1>This is Other Profile!</h1>
                <p>The current user ID is: {this.props.match.params.id}</p>
                <div>
                    <img
                        src={this.state.profilePicUrl}
                        alt={this.state.firstName}
                    />
                    <Friendshipbutton otherId={this.props.match.params.id} />
                    <p>{this.state.firstName}</p>
                    <p>{this.state.lastName}</p>
                    <p>{this.state.biography}</p>
                </div>
            </div>
        );
    }
}
