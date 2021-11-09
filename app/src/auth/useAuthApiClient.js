import * as React from "react";
import { useState, useEffect } from "react";

import useAuth0 from "./useAuth0";

const makeApi = (accessToken) => {
  const actions = {
    addOrUpdateUser: (user) => _post("/api/users", { user }),
  };

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

const useAuthApiClient = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    loading: true,
    error: null,
    userApi: undefined,
  });

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setState({
            loading: false,
            error: null,
            userApi: makeApi(accessToken),
          });
        } catch (error) {
          setState({ loading: false, error, userApi: undefined });
        }
      })();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return state;
};

export default useAuthApiClient;
