import React from "react";

import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Nav from "./Nav";

describe("<Nav />", () => {
  it("Navbar renders NavLink with the text 'New Card'", () => {
    const { queryAllByText } = render(
      <Router>
        <Nav />
      </Router>,
    );
    expect(queryAllByText(/New Card/i).length).toBeGreaterThan(0);
  });
});
