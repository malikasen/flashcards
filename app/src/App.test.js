import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { flashcards } from "./testMocks";

window.fetch = () => {
  return Promise.resolve({
    json: Promise.resolve(flashcards),
  });
};
describe("App", () => {
  beforeEach(() => {
    // if you have an existing `beforeEach` just add the following lines to it
  });
  test("delete button redirects to home page", async () => {
    render(<App />);
    await waitFor(() => {
      return screen.getByText("mark as learnt");
    });
  });
});
