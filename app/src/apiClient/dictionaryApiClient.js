import * as React from "react";

import useAuth0 from "../auth/useAuth0";

const makeApi = (accessToken) => {
  const actions = {
    getDefinition: (word) => {
      console.log("word", word);
      return _get("/api/dictionary?word=" + word);
    },
  };

  const _get = async (url) => (await _fetch(url)).json();

  const _fetch = (url, options) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return actions;
};

const dictionaryApiClient = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    apiClient: undefined,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setState({
            loading: false,
            error: null,
            apiClient: makeApi(accessToken),
          });
        } catch (error) {
          setState({ loading: false, error, apiClient: undefined });
        }
      })();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return state;
};

export default dictionaryApiClient;
