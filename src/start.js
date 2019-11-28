import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { App } from "./app";

let welcome = <Welcome />;

if (location.pathname != "/welcome") {
    welcome = <App />;
} else {
    // welcome = <img src="/logo.jpg" className="logo-small" alt="Logo" />;
    welcome = <Welcome />;
}

ReactDOM.render(welcome, document.querySelector("main"));
