import React from "react";
import ReactDOM from "react-dom";

const elem = <HelloWorld />;

ReactDOM.render(elem, document.querySelector("main"));

function HelloWorld() {
    return <div>Hello, World!</div>;
}
