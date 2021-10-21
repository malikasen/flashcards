import * as React from "react";
import { useState, useCallback } from "react";

import { Routes, Route } from "react-router-dom";

import Flashcards from "../Flashcards";
import Side from "../Flashcards/Side";
import Nav from "../Nav";
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
  const [flashcards, setFlashcards] = useState([{}]);

  const loadFlashcards = React.useCallback(
    async () => setFlashcards(await apiClient.getFlashcards()),
    [apiClient],
  );

  React.useEffect(() => {
    !loading && loadFlashcards();
  }, [loading, loadFlashcards]);
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home loading={loading} flashcards={flashcards} />}
          />
          <Route
            path="/practice"
            element={<Protected component={Practice} flashcards={flashcards} />}
          />
        </Routes>
      </main>
    </>
  );
};

const Home = ({ flashcards, loading }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
        <p>{process.env.REACT_APP_SUBTITLE}</p>
      </header>
      {isAuthenticated && !loading ? (
        <Flashcards flashcards={flashcards} />
      ) : null}
    </>
  );
};

const Practice = ({ flashcards }) => {
  console.log("flashcards", flashcards);
  const [cardNumber, setCardNumber] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const toggleSide = useCallback(() => {
    setShowFront(!showFront);
  }, [showFront]);
  const incrementCard = useCallback(() => {
    if (cardNumber === flashcards.length - 1) {
      setCardNumber(0);
    } else {
      setCardNumber(cardNumber + 1);
    }
  }, [cardNumber]);
  const decrementCard = useCallback(() => {
    if (cardNumber === 0) {
      setCardNumber(flashcards.length - 1);
    } else {
      setCardNumber(cardNumber - 1);
    }
  }, [cardNumber]);

  return (
    <>
      {showFront && (
        <Side
          text={flashcards[cardNumber].front_of_card}
          toggleSide={toggleSide}
        />
      )}
      {!showFront && (
        <Side
          text={flashcards[cardNumber].back_of_card}
          toggleSide={toggleSide}
        />
      )}
      <button onClick={incrementCard}>Previous</button>
      <button onClick={decrementCard}>Next</button>
    </>
  );
};
export default App;
