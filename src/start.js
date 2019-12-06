import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { App } from "./app";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let welcome = <Welcome />;

if (location.pathname != "/welcome") {
    welcome = (
        <Provider store={store}>
            <App />
        </Provider>
    );
} else {
    welcome = <Welcome />;
}

ReactDOM.render(welcome, document.querySelector("main"));
