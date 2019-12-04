import React from "react";
import { App } from "./app";
import axios from "./axios";
import { render, waitForElement } from "@testing-library/react";

jest.mock("./axios");

test("App renders correctly", () => {
    axios.get.mockResolvedValue({
        data: {
            id: 10,
            first: "Funky",
            last: "Chicken",
            url: "/funkychicken.png"
        }
    });
    const { container } = render(<App />);

    expect(container.innerHTML).toBe("");

    // const elem = await waitForElement(
    //     () => container.querySelector('div')
    // )
});
