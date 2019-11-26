import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let welcome = <Welcome />;

if (location.pathname != "/welcome") {
    welcome = <img src="/logo.jpg" className="logo-small" alt="Logo" />;
}

ReactDOM.render(welcome, document.querySelector("main"));
