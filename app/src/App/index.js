import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Routes,
  Route,
  useParams,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";

import Flashcards from "../Flashcards";
import EmptySides from "../Flashcards/EmptySides";
import ResultFlashcard from "../Flashcards/ResultFlashcard";
import Side from "../Flashcards/Side";
import Footer from "../Footer";
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
      const flashcards = await flashcardApi
        .getFlashcards()
        .catch((error) => console.log("console_error", error));
      setFlashcards(flashcards);
    }
  }, [flashcardApi, flashcardApiLoading]);
  const cardsToPractice = flashcards.filter((card) => card.is_learnt === false);
  React.useEffect(() => {
    !loading && loadFlashcards();
  }, [loading, loadFlashcards]);
  return (
    <div id={styles.pageContainer}>
      <header>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Nav toggle={toggle} />
      </header>
      <main id={styles.contentWrap}>
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
                cardsToPractice={cardsToPractice}
                flashcardApi={flashcardApi}
                masteredCards={masteredCards}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const Home = ({ flashcards, loading, loadFlashcards }) => {
  const { isAuthenticated, user } = useAuth0();
  React.useEffect(() => {
    !loading && loadFlashcards();
  }, [loading, loadFlashcards]);
  return (
    <>
      {!isAuthenticated && <HeroSection />}
      {isAuthenticated && !loading ? (
        <div className={styles.authenticatedPageContainer}>
          <div className={styles.greetingContainer}>
            <p>
              Hello, {user.given_name}! You have {flashcards.length} cards in
              your collection.
            </p>
          </div>
          <Flashcards flashcards={flashcards} loadFlashcards={loadFlashcards} />
        </div>
      ) : null}
    </>
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
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState(0);
  const [showFront, setShowFront] = useState(true);
  useEffect(() => {
    setMasteredCards([]);
  }, []);
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
    navigate("/result");
  };
  const onClickMastered = useCallback(async () => {
    const currentCard = cardsToPractice[cardNumber];
    await flashcardApi.editIsLearnt(currentCard);
    currentCard.is_learnt = true;
    if (!masteredCards.includes(currentCard)) {
      setMasteredCards([...masteredCards, currentCard]);
    }
  }, [cardNumber, masteredCards]);
  return (
    <div className={styles.authenticatedPageContainer}>
      <div className={styles.cardNumberTextContainer}>
        <p className={styles.cardNumberText}>
          Card number: {cardNumber + 1}/{cardsToPractice.length}
        </p>
      </div>
      {showFront && (
        <div>
          <div className={styles.clickInstructionsContainer}>
            <p className={styles.clickInstructions}>
              Click on card, to see the back of the card
            </p>
          </div>
          <Side
            text={cardsToPractice[cardNumber].front_of_card}
            toggleSide={toggleSide}
          />
        </div>
      )}
      {!showFront && (
        <div>
          <div className={styles.clickInstructionsContainer}>
            <p className={styles.clickInstructions}>
              Click on card, to see the front of the card
            </p>
          </div>
          <Side
            text={cardsToPractice[cardNumber].back_of_card}
            toggleSide={toggleSide}
          />
        </div>
      )}
      <Stack direction="row" spacing={2} className={styles.buttonStack}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosSharpIcon />}
          className={styles.slideButton}
          onClick={decrementCard}
          disabled={cardNumber === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosSharpIcon />}
          className={styles.slideButton}
          onClick={incrementCard}
          disabled={cardNumber === cardsToPractice.length - 1}
        >
          Next
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} className={styles.buttonStack}>
        <Button
          variant="contained"
          className={styles.slideButton}
          id={styles.masteredBtn}
          onClick={onClickMastered}
        >
          Mark as Learned
        </Button>
      </Stack>
      <Stack direction="row" className={styles.buttonStack}>
        {cardNumber === cardsToPractice.length - 1 && (
          <Button
            variant="contained"
            className={styles.toResultsBtn}
            onClick={showResult}
          >
            Show Results
          </Button>
        )}
      </Stack>
    </div>
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
    <div className={styles.authenticatedPageContainer}>
      <EmptySides
        cardId={card.id}
        front_of_card={card.front_of_card}
        back_of_card={card.back_of_card}
        onClickSave={editCardAndRedirect}
        onClickSaveAndAddCard={editCard}
        onClickDeleteCard={deleteCard}
      />
    </div>
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
    <div className={styles.authenticatedPageContainer}>
      <EmptySides
        onClickSave={saveCardAndRedirect}
        onClickSaveAndAddCard={saveCard}
        onClickDeleteCard={deleteCard}
      />
    </div>
  );
};

const Result = ({ cardsToPractice, flashcardApi, masteredCards }) => {
  return (
    <div className={styles.authenticatedPageContainer}>
      <p className={styles.resultCategories}>Not learned cards</p>
      <div className={styles.resultFlashcardContainer}>
        {cardsToPractice.map((flashcard) => {
          return (
            <ResultFlashcard
              flashcard={flashcard}
              flashcardApi={flashcardApi}
            />
          );
        })}
      </div>
      <p className={styles.resultCategories}>Learned cards</p>
      <div className={styles.resultFlashcardContainer}>
        {masteredCards.map((flashcard) => {
          return (
            <ResultFlashcard
              flashcard={flashcard}
              flashcardApi={flashcardApi}
            />
          );
        })}
      </div>
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
