import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: ""
        };
        this.toggleEditBio = this.toggleEditBio.bind(this);
    }

    componentDidMount() {
        console.log("props in BioEditor: ", this.props);
        if (!this.props.bio) {
            console.log("no bio!");
            this.setState(
                {
                    buttonText: "Add your bio"
                },
                () => console.log("this.state", this.state)
            );
        }
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

// onClick on the 'button' so that it can have toggle modal
