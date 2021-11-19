import * as React from "react";

import useAuth0 from "../auth/useAuth0";

const makeApi = (accessToken) => {
  const actions = {
    getFlashcards: () => _get("/api/flashcards"),
    getCard: (cardId) => _get(`/api/flashcards/${cardId}`),
    editIsLearnt: (card) => {
      return _put(`/api/flashcards/${card.id}`, { card });
    },
    saveFlashcard: (card) => {
      return _post("/api/flashcards", { card });
    },
    editFlashcard: (card) => {
      return _put(`/api/flashcards/edit/${card.id}`, { card });
    },
    deleteFlashcard: (id) => {
      return _delete(`/api/flashcards/${id}`, { id });
    },
  };

  const _get = async (url) => (await _fetch(url)).json();

  const _post = async (url, body) => {
    const response = await _fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };

  const _put = async (url, body) => {
    const response = await _fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };

  const _delete = async (url, body) => {
    const response = await _fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };

  // const _fetch = (url, options) =>
  //   fetch(url, {
  //     ...options,
  //     headers: {
  //       ...(options?.headers ?? {}),
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  const _fetch = (url, options) => {
    const updatedUrl =
      process.env.NODE_ENV === "test" ? `http://test.com${url}` : url;
    return fetch(updatedUrl, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
  return actions;
};

const useFlashcardApiClient = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    flashcardApi: undefined,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setState({
            loading: false,
            error: null,
            flashcardApi: makeApi(accessToken),
          });
        } catch (error) {
          setState({ loading: false, error, flashcardApi: undefined });
        }
      })();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return state;
};

export default useFlashcardApiClient;
