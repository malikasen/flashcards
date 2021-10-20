import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Flashcards from "../Flashcards";
import Flashcard from "../Flashcards/Flashcard";
import Nav from "../Nav";
import Tasks from "../Tasks";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Protected } from "../auth/widgets";

import styles from "./styles.module.scss";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/practice"
            element={<Protected component={Practice} />}
          />
        </Routes>
      </main>
    </>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
        <p>{process.env.REACT_APP_SUBTITLE}</p>
      </header>
      {isAuthenticated ? <Flashcards /> : null}
    </>
  );
};

const Practice = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <p>Front of the card</p>
    </>
  );
};
export default App;
