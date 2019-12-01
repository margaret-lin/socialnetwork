import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "",
            bioEditorText: this.props.biography
        };
        this.toggleEditBio = this.toggleEditBio.bind(this);
    }

    componentDidMount() {}

    toggleEditBio() {
        console.log("toggleEditBio is running!");
        this.setState({
            editingMode: !this.state.editingMode
        });
        let me = this;
        axios
            .post("/update-bio", { biography: this.state.bioEditorText })
            .then(({ data }) => {
                console.log("axio/post biography is successful!");
                me.props.updateBiography(me.state.bioEditorText);
            })
            .catch(err => console.log("err in axios.post biography", err));
    }

    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }

    render() {
        let bioButtonText = "Add Bio";
        if (this.state.bioEditorText) {
            bioButtonText = "Edit";
        }

        if (this.state.editingMode) {
            return (
                <div>
                    <p>Write something to your bio!</p>
                    <textarea
                        name="bioEditorText"
                        onChange={e => this.handleChange(e.target)}
                        defaultValue={this.state.bioEditorText}
                    />
                    <button onClick={this.toggleEditBio}>Save</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>I am the bio editor!</h1>
                    <p>{this.props.biography}</p>
                    <button onClick={this.toggleEditBio}>
                        {bioButtonText}
                    </button>
                </div>
            );
        }
    }
}
