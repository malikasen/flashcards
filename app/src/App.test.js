import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";

import App from "./App";

describe("App", () => {
  beforeEach(() => {
    // if you have an existing `beforeEach` just add the following lines to it
    fetchMock.mockResponse((req) => {
      console.log("req.url", req.url);
    });
  });
  test("delete button redirect to home page", async () => {
    render(<App />);
    // await waitFor(() => {
    //   return screen.getByText("mark as learnt");
    // });
    // const editButton = 
  });
});
