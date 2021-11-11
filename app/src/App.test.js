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

describe("<App />", () => {
  beforeEach(() => {
    console.log("inside before each");
    fetchMock.mockResponse((req) => {
      console.log("req", req);
      if (req.url === "/api/flashcards") {
        return Promise.resolve({
          body: JSON.stringify([
            {
              id: 1,
              is_learnt: false,
              front_of_card: "hello i am the front",
              back_of_card: "hello i am the back",
            },
          ]),
        });
      }
      if (req.url === "/api/users") {
        return Promise.resolve({ body: JSON.stringify([]) });
      }
    });
  });
  it("App renders NavLink with text 'New Card'", () => {
    const { queryAllByText } = render(<App />);
    expect(queryAllByText(/New Card/i).length).toBeGreaterThan(0);
  });
  it("App renders a greeting message in the home page", async () => {
    const { getByText } = render(<App />);
    const helloFirst = await waitFor(() => {
      return getByText(/Hello, first!/i);
    });
    expect(helloFirst).toBeTruthy();
  });
  it.only("The greeting message in the home page includes the number of loaded cards", async () => {
    const { getByText } = render(<App />);
    const string = await waitFor(() => {
      return getByText(/You have 1 cards in your collection./i);
    });
    expect(string).toBeTruthy();
  });
});

// describe("App", () => {
//   beforeEach(() => {
//     // if you have an existing `beforeEach` just add the following lines to it
//     fetchMock.mockResponse((req) => {
//       if (req.url === "/api/flashcards") {
//         return Promise.resolve({
//           body: JSON.stringify([
//             {
//               id: 1,
//               is_learnt: false,
//               front_of_card: "hello i am the front",
//               back_of_card: "hello i am the back",
//             },
//           ]),
//         });
//       }
//       if (req.url === "/api/users") {
//         return Promise.resolve({ body: JSON.stringify([]) });
//       }
//     });
//   });
//   test("delete button redirect to home page", async () => {
//     render(<App />);
//     await waitFor(() => {
//       return screen.getByText("Mark as learnt");
//     });
//     // const editButton =
//   });
// });
