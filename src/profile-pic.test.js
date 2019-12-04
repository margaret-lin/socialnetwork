import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ProfilePic } from "./profile-pic";

test("img element sets url props as src", () => {
    const { container } = render(<ProfilePic profilePicUrl="/default.png" />);

    expect(container.querySelector("img").src).toContain("/default.png");
});

test("onClick props gets called when img is clicked", () => {
    const onClick = jest.fn();

    const { container } = render(<ProfilePic onClick={onClick} />);

    fireEvent.click(container.querySelector("img"));

    expect(onClick.mock.calls.length).toBe(0);
});
