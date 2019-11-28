import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let welcome = <Welcome />;

if (location.pathname != "/welcome") {
    elem = <Welcome />;
    // welcome = <img src="/logo.jpg" className="logo-small" alt="Logo" />;
} else {
    elem = <App />;
}

ReactDOM.render(welcome, document.querySelector("main"));
