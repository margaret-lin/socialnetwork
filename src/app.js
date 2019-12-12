import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
// import Navigation from "./nav-bar";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";
import { Profile } from "./profile";
import { OtherProfile } from "./other-profile";
import { FindPeople } from "./find-people";
import { Friends } from "./friends";
import { Chat } from "./chat-encounter";
import { Notification } from "./notification";
import { OnlineUsers } from "./online-users";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            profilePicUrl: "",
            biography: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.refreshProfilePic = this.refreshProfilePic.bind(this);
        this.updateBiography = this.updateBiography.bind(this);
    }

    componentDidMount() {
        axios.get("/user.json").then(({ data }) => {
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                profilePicUrl: data.profilePicUrl,
                biography: data.biography
            });
        });
    }

    toggleModal() {
        console.log("toggle modal is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    refreshProfilePic(newImageUrl) {
        console.log("new image url", newImageUrl);
        this.setState({
            profilePicUrl: newImageUrl,
            uploaderIsVisible: false
        });
    }

    updateBiography(bioText) {
        console.log("biography text is: ", bioText);
        this.setState({
            biography: bioText
        });
    }

    render() {
        // make sure not to display until data arrives...
        if (!this.state.firstName) {
            return null;
        }
        return (
            <div>
                <BrowserRouter>
                    {/* <Navigation /> */}
                    <div>
                        <div id="nav-bar">
                            <Link to="/">
                                <img
                                    src="/logo.jpg"
                                    className="logo-small"
                                    alt="Logo"
                                />
                            </Link>
                            <div className="nav-container-items">
                                <ul>
                                    <Button startIcon={<SearchIcon />}>
                                        <Link to="/findpeople">
                                            Find Friends
                                        </Link>
                                    </Button>
                                    <Button startIcon={<ChatIcon />}>
                                        <li>
                                            <Link to="/chat">Chat</Link>
                                        </li>
                                    </Button>
                                    <Button startIcon={<PeopleIcon />}>
                                        <li>
                                            <Link to="/onlineusers">
                                                Online Users
                                            </Link>
                                        </li>
                                    </Button>
                                    <Button startIcon={<ExitToAppIcon />}>
                                        <li>
                                            <Link to="#">Logout</Link>
                                        </li>
                                    </Button>
                                </ul>
                            </div>

                            <ProfilePic
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                profilePicUrl={this.state.profilePicUrl}
                                toggleModal={this.toggleModal}
                                profilePicClass="small-profile-pic"
                            />
                        </div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    profilePicUrl={this.state.profilePicUrl}
                                    biography={this.state.biography}
                                    updateBiography={this.updateBiography}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/findpeople"
                            component={FindPeople}
                        />
                        <Route exact path="/friends" component={Friends} />
                        <Route exact path="/chat" component={Chat} />
                        <Route
                            exact
                            path="/onlineusers"
                            component={OnlineUsers}
                        />
                    </div>
                </BrowserRouter>

                {/* <Notification /> */}
                {this.state.uploaderIsVisible && (
                    <Uploader refreshProfilePic={this.refreshProfilePic} />
                )}
            </div>
        );
    }
}

// updateBio() passes down to Profile, pass down to Bioedit
