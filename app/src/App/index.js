import * as React from "react";
import { useState, useCallback } from "react";

import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Routes,
  Route,
  useParams,
  BrowserRouter as Router,
} from "react-router-dom";

import Flashcards from "../Flashcards";
import EmptySides from "../Flashcards/EmptySides";
import ResultFlashcard from "../Flashcards/ResultFlashcard";
import Side from "../Flashcards/Side";
import HeroSection from "../HeroSection";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import flashcardApiClient from "../apiClient/useFlashcardApiClient";
import AuthProvider from "../auth/AuthProvider";
import useAuth0 from "../auth/useAuth0";
import userApiClient from "../auth/useAuthApiClient";
import { Protected } from "../auth/widgets";

import styles from "./styles.module.scss";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loading, userApi } = userApiClient();
  const { loading: flashcardApiLoading, flashcardApi } = flashcardApiClient();
  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      userApi.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, userApi]);
  const [flashcards, setFlashcards] = useState([]);
  const [masteredCards, setMasteredCards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const loadFlashcards = React.useCallback(async () => {
    if (!flashcardApiLoading) {
      setFlashcards(await flashcardApi.getFlashcards());
    }
  }, [flashcardApi]);
  const cardsToPractice = flashcards.filter((card) => card.is_learnt === false);
  React.useEffect(() => {
    !loading && loadFlashcards();
  }, [loading, loadFlashcards]);
  return (
    <>
      <header>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Nav toggle={toggle} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loading={loading}
                flashcards={flashcards}
                loadFlashcards={loadFlashcards}
              />
            }
          />
          <Route
            path="/practice"
            element={
              flashcards.length && (
                <Protected
                  component={Practice}
                  flashcards={flashcards}
                  flashcardApi={flashcardApi}
                  masteredCards={masteredCards}
                  setMasteredCards={setMasteredCards}
                />
              )
            }
          />
          <Route
            path="/new-card"
            element={
              <Protected component={CreateCard} flashcardApi={flashcardApi} />
            }
          />
          <Route
            path="/edit-card/:cardId"
            element={<Protected component={EditCard} />}
          />
          <Route
            path="/result"
            element={
              <Protected
                component={Result}
                // flashcards={flashcards}
                cardsToPractice={cardsToPractice}
                flashcardApi={flashcardApi}
                masteredCards={masteredCards}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
};

const Home = ({ flashcards, loading, loadFlashcards }) => {
  const { isAuthenticated, user } = useAuth0();
  React.useEffect(() => {
    !loading && loadFlashcards();
  }, [loading, loadFlashcards]);
  return (
    <div>
      {/* <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
      </header> */}
      {!isAuthenticated && <HeroSection />}
      {isAuthenticated && !loading ? (
        <div>
          <h2>Hello, {user.given_name}</h2>
          <h3>You have {flashcards.length} cards!</h3>
          <Flashcards flashcards={flashcards} loadFlashcards={loadFlashcards} />
        </div>
      ) : null}
    </div>
  );
};

const Practice = ({
  flashcards,
  flashcardApi,
  masteredCards,
  setMasteredCards,
}) => {
  const [cardsToPractice, setCardsToPractice] = useState(
    flashcards.filter((card) => card.is_learnt === false),
  );
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
  const showResult = () => {
    window.location.href = "/result";
  };
  const onClickMastered = useCallback(async () => {
    const currentCard = cardsToPractice[cardNumber];
    await flashcardApi.editIsLearnt(currentCard);
    console.log(currentCard);
    setMasteredCards([...masteredCards, currentCard]);
  }, [cardNumber, masteredCards]);
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
        {cardNumber !== 0 && (
          <Button
            variant="contained"
            startIcon={<ArrowBackIosSharpIcon />}
            className={styles.slideButton}
            onClick={decrementCard}
          >
            Previous
          </Button>
        )}
        {cardNumber !== cardsToPractice.length - 1 && (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosSharpIcon />}
            className={styles.slideButton}
            onClick={incrementCard}
          >
            Next
          </Button>
        )}
      </Stack>
      <Stack direction="row">
        {cardNumber === cardsToPractice.length - 1 && (
          <Button
            variant="contained"
            className={styles.stack}
            onClick={showResult}
          >
            Show Results
          </Button>
        )}
      </Stack>
      <Stack direction="row" spacing={2} className={styles.stack}>
        <Button
          variant="contained"
          className={styles.slideButton}
          id={styles.masteredBtn}
          onClick={onClickMastered}
        >
          Mastered
        </Button>
      </Stack>
    </>
  );
};

const EditCard = () => {
  const { loading, flashcardApi } = flashcardApiClient();
  const { cardId } = useParams();
  const [card, setCard] = useState({});

  const loadFlashcard = React.useCallback(
    async () => setCard(await flashcardApi.getCard(cardId)),
    [flashcardApi],
  );
  React.useEffect(() => {
    !loading && loadFlashcard();
  }, [loading, loadFlashcard]);
  const editCardAndRedirect = async (card) => {
    await flashcardApi.editFlashcard(card);
    window.location.href = "/";
  };
  const editCard = async (card) => {
    await flashcardApi.editFlashcard(card);
  };
  const deleteCard = async (id) => {
    await flashcardApi.deleteFlashcard(id);
    window.location.href = "/";
  };
  if (!card.id) {
    return (
      <>
        <EmptySides />
      </>
    );
  }
  return (
    <>
      <EmptySides
        cardId={card.id}
        front_of_card={card.front_of_card}
        back_of_card={card.back_of_card}
        onClickSave={editCardAndRedirect}
        onClickSaveAndAddCard={editCard}
        onClickDeleteCard={deleteCard}
      />
    </>
  );
};

const CreateCard = ({ flashcardApi }) => {
  const saveCardAndRedirect = async (card) => {
    await flashcardApi.saveFlashcard(card);
    window.location.href = "/";
  };
  const saveCard = async (card) => {
    await flashcardApi.saveFlashcard(card);
  };
  const deleteCard = (id) => {
    window.location.href = "/";
  };
  return (
    <>
      <EmptySides
        onClickSave={saveCardAndRedirect}
        onClickSaveAndAddCard={saveCard}
        onClickDeleteCard={deleteCard}
      />
    </>
  );
};

const Result = ({ cardsToPractice, flashcardApi, masteredCards }) => {
  console.log(masteredCards);
  return (
    <div>
      {cardsToPractice.map((flashcard) => {
        return (
          <ResultFlashcard flashcard={flashcard} flashcardApi={flashcardApi} />
        );
      })}
      {masteredCards.map((flashcard) => {
        return (
          <ResultFlashcard flashcard={flashcard} flashcardApi={flashcardApi} />
        );
      })}
    </div>
  );
};
const AppWrapper = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
export default AppWrapper;
