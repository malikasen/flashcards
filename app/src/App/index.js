import * as React from "react";
import { useState, useCallback } from "react";

import { ArrowBackIosSharp as ArrowBackIosSharp } from "@material-ui/icons";
import { ArrowForwardIosSharp as ArrowForwardIosSharp } from "@material-ui/icons";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
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
            element={
              <Protected
                component={Practice}
                flashcards={flashcards}
                apiClient={apiClient}
              />
            }
          />
          <Route
            path="/create-edit-card"
            element={<Protected component={CreateEdit} />}
          />
        </Routes>
      </main>
    </>
  );
};

const Home = ({ flashcards, loading }) => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
      </header>
      {isAuthenticated && !loading ? (
        <div>
          <h2>Hello, {user.given_name}</h2>
          <Flashcards flashcards={flashcards} />
        </div>
      ) : null}
    </div>
  );
};

const Practice = ({ flashcards, apiClient }) => {
  const cardsToPractice = flashcards.filter((card) => card.is_learnt === false);
  const [cardNumber, setCardNumber] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const toggleSide = useCallback(() => {
    setShowFront(!showFront);
  }, [showFront]);
  const incrementCard = useCallback(() => {
    if (cardNumber === cardsToPractice.length - 1) {
      setCardNumber(0);
    } else {
      setCardNumber(cardNumber + 1);
    }
  }, [cardNumber]);
  const decrementCard = useCallback(() => {
    if (cardNumber === 0) {
      setCardNumber(cardsToPractice.length - 1);
    } else {
      setCardNumber(cardNumber - 1);
    }
  }, [cardNumber]);
  const editIsLearnt = () => {
    apiClient.editIsLearnt(cardsToPractice[cardNumber]);
  };

  return (
    <>
      {showFront && (
        <Side
          text={cardsToPractice[cardNumber].front_of_card}
          toggleSide={toggleSide}
        />
      )}
      {!showFront && (
        <Side
          text={cardsToPractice[cardNumber].back_of_card}
          toggleSide={toggleSide}
        />
      )}
      <Stack direction="row" spacing={2} className={styles.stack}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosSharp />}
          className={styles.slideButton}
          onClick={incrementCard}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosSharp />}
          className={styles.slideButton}
          onClick={decrementCard}
        >
          Next
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} className={styles.stack}>
        <Button
          variant="contained"
          className={styles.slideButton}
          id={styles.masteredBtn}
          onClick={() => {
            return editIsLearnt();
          }}
        >
          Mastered
        </Button>
        <Button
          variant="contained"
          className={styles.slideButton}
          id={styles.practiceMoreBtn}
          // onClick={practiceMore}
        >
          Practice more
        </Button>
      </Stack>
    </>
  );
};

const CreateEdit = () => {
  return <div>Create/Edit page</div>;
};
export default App;
