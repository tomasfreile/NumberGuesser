import React, { useState } from "react";
import { Grid, Typography, Box, Modal, Button, Alert } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [start, setStart] = useState(false);
  const [guess, setGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [number, setNumber] = useState(Math.floor(Math.random() * 100));
  const [feedback, setFeedback] = useState("");
  const [maxGuesses, setMaxGuesses] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  const handleGuess = () => {
    if (guess === "") {
      setIsAlertOpen(true);
      return;
    } else {
      setIsAlertOpen(false);
    }

    if (guessCount + 1 >= maxGuesses && guess !== number) {
      setFeedback("You lose! The number was " + number);
      setShowRestart(true);
    } else if (guess < number) {
      setFeedback("The number is higher!");
    } else if (guess > number) {
      setFeedback("The number is lower!");
    } else {
      setFeedback("Correct! You win!");
      setShowRestart(true);
    }

    setGuessCount(guessCount + 1);
    setIsModalOpen(true);
  };

  const handleRestart = () => {
    setStart(false);
    setGuess("");
    setGuessCount(0);
    setFeedback("");
    setIsModalOpen(false);
    setShowRestart(false);
    setMaxGuesses(null);
    setNumber(Math.floor(Math.random() * 100));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue) || newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }
    setGuess(newValue);
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#5c9aff",
        padding: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          pt: "40px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h3">Number Guesser</Typography>
        <Typography variant="h5" sx={{ mt: "20px", mb: "20px" }}>
          Guess the number between 0 and 100!
        </Typography>
        {!start && (
          <Grid container sx={{ justifyContent: "center" }}>
            <Typography variant="h6" sx={{ mr: "10px" }}>
              Difficulty:
            </Typography>
            <Button
              variant="contained"
              sx={{
                mr: "10px",
                backgroundColor: "#07f03d",
                "&:hover": { backgroundColor: "#07db38" },
              }}
              onClick={() => {
                setStart(true);
                setMaxGuesses(15);
              }}
            >
              Easy
            </Button>
            <Button
              variant="contained"
              sx={{
                mr: "10px",
                backgroundColor: "#f5af36",
                "&:hover": { backgroundColor: "#f7a820" },
              }}
              onClick={() => {
                setStart(true);
                setMaxGuesses(10);
              }}
            >
              Medium
            </Button>
            <Button
              variant="contained"
              sx={{
                mr: "10px",
                backgroundColor: "#fc2d2d",
                "&:hover": { backgroundColor: "#f71616" },
              }}
              onClick={() => {
                setStart(true);
                setMaxGuesses(5);
              }}
            >
              Hard
            </Button>
          </Grid>
        )}
        {start && (
          <Grid
            container
            sx={{
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            
            <input
              type="number"
              value={guess}
              onChange={handleInputChange}
              placeholder="Enter a number"
              style={{
                width: "180px",
                height: "50px",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "20px",
              }}
            />
            <Button
              variant="outlined"
              sx={{
                mt: "15px",
                mb: "15px",
              }}
              onClick={handleGuess}
            >
              Guess
            </Button>
            {isAlertOpen && (
              <Alert
                sx={{ mb: "10px", cursor: "pointer" }}
                severity="warning"
                onClick={closeAlert}
              >
                Please enter a number
              </Alert>
            )}
            <div>
              {Array.from({ length: maxGuesses }).map((_, index) => (
                <span key={index}>
                  {index < maxGuesses - guessCount ? (
                    <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                  ) : (
                    <HeartBrokenIcon sx={{ color: "gray", fontSize: 30 }} />
                  )}
                </span>
              ))}
            </div>
          </Grid>
        )}
      </Box>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="feedback-modal"
        aria-describedby="feedback-message"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            p: "20px",
            textAlign: "center",
            backgroundColor: "#fff",
            width: "200px",
          }}
        >
          <CloseIcon
            sx={{
              float: "right",
              cursor: "pointer",
              position: "relative",
              bottom: "10px",
              left: "10px"
            }}
            onClick={closeModal}
          />
          <Typography variant="body1" id="feedback-message">
            {feedback}
          </Typography>
          {showRestart && (
            <Button
              variant="contained"
              sx={{ mt: "20px" }}
              onClick={handleRestart}
            >
              <ReplayIcon />
            </Button>
          )}
        </Box>
      </Modal>
    </Grid>
  );
}

export default App;
