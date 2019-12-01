import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            biography: "",
            editingMode: false,
            buttonText: ""
        };
        this.toggleEditBio = this.toggleEditBio.bind(this);
    }

    componentDidMount() {
        axios
            .post("/update-bio", { biography: this.state.biography })
            .then(({ data }) => {
                console.log("axio/post biography made!");
                if (!this.props.bio) {
                    console.log("no bio!");
                    this.setState(
                        {
                            buttonText: "Add your bio",
                            bio: data.biography
                        },
                        () => console.log("this.state", this.state)
                    );
                } else {
                    console.log("someone has bio!");
                    this.setState({
                        buttonText: "Edit bio",
                        bio: data.biography
                    });
                }
            })
            .catch(err => console.log("err in axios.post biography", err));
    }

    toggleEditBio() {
        console.log("toggleEditBio is running!");
        this.setState({
            editingMode: !this.state.editingMode
        });
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div>
                    <p>Write something to your bio!</p>
                    <textarea defaultValue={this.props.bio} />
                    <button onClick={this.toggleEditBio}>Save</button>
                </div>
            );
        }
        return (
            <div>
                <h1>I am the bio editor!</h1>
                <button onClick={this.toggleEditBio}>
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}
