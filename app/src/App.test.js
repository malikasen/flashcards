import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";

import App from "./App";

jest.mock("@auth0/auth0-react", () => {
  const mockUser = {
    name: "first last",
  };
  const auth0Response = {
    isAuthenticated: true,
    user: mockUser,
    getAccessTokenSilently: () => Promise.resolve("fake-access-token"),
  };
  const useAuth0 = () => auth0Response;
  const Auth0Provider = ({ children }) => children;
  return {
    useAuth0,
    Auth0Provider,
  };
});

// fetchMock.enableMocks();

describe("<App />", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse((req) => {
      if (req.url.endsWith("/api/flashcards")) {
        return Promise.resolve({
          body: JSON.stringify([
            {
              id: 1,
              is_learnt: false,
              front_of_card: "hello i am the front",
              back_of_card: "hello i am the back",
            },
            {
              id: 2,
              is_learnt: false,
              front_of_card: "front",
              back_of_card: "back",
            },
          ]),
        });
      }
      if (req.url.endsWith("/api/users")) {
        return Promise.resolve({ body: JSON.stringify({}) });
      }
    });
  });
  it("App renders a greeting message in the home page", async () => {
    const { getByText } = render(<App />);
    const helloFirst = await waitFor(() => {
      return getByText(/Hello, first!/i);
    });
    expect(helloFirst).toBeTruthy();
  });
  it("The greeting message in the home page includes the number of loaded cards", async () => {
    const { getByText } = render(<App />);
    const string = await waitFor(() => {
      return getByText(/You have 2 cards in your collection./i);
    });
    expect(string).toBeTruthy();
  });
});
