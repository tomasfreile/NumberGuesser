import React, { useState } from "react";
import { Grid, Typography, Box, Modal, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [guess, setGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [number, setNumber] = useState(Math.floor(Math.random() * 101));
  const [feedback, setFeedback] = useState("");
  const [maxGuesses, setMaxGuesses] = useState(null);

  const handleGuess = () => {
    setGuessCount(guessCount + 1);
    if (guess < number) {
      setFeedback("The number is higher!");
    } else if (guess > number) {
      setFeedback("The number is lower!");
    } else {
      setFeedback("Correct! You win!");
    }
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
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
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
              style={{
                width: "120px",
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
              }}
              onClick={handleGuess}
            >
              Guess
            </Button>
          </Grid>
        )}
      </Box>
    </Grid>
  );
}

export default App;
