import * as React from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import Flashcard from "./Flashcard";
import styles from "./styles.module.scss";

const Flashcards = ({ flashcards, loadFlashcards }) => {
  const unlearntFlashcards = flashcards.filter(
    (flashcard) => flashcard.is_learnt === false,
  );
  const learntFlashcards = flashcards.filter(
    (flashcard) => flashcard.is_learnt === true,
  );
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <div className={styles.homepageTabs}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className={styles.homepageTabs}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Not Learnt Cards" {...a11yProps(0)} value="1" />
                <Tab label="Learnt Cards" {...a11yProps(1)} value="2" />
              </TabList>
            </Box>
          </div>
          <TabPanel value={"1"} index={0}>
            <div className="greetingContainer">
              <h3>Total count: {unlearntFlashcards.length}</h3>
            </div>
            <div className={styles.homepageFlashcardContainer}>
              {unlearntFlashcards.map((flashcard) => {
                return (
                  <Flashcard
                    flashcard={flashcard}
                    loadFlashcards={loadFlashcards}
                  />
                );
              })}
            </div>
          </TabPanel>
          <TabPanel value={"2"} index={1}>
            <div className="greetingContainer">
              <h3>Total count: {learntFlashcards.length}</h3>
            </div>
            <div className={styles.homepageFlashcardContainer}>
              {learntFlashcards.map((flashcard) => {
                return (
                  <Flashcard
                    flashcard={flashcard}
                    loadFlashcards={loadFlashcards}
                  />
                );
              })}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Flashcards;
