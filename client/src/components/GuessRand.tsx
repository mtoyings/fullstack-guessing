import { useState } from "react";
import { Box, Button, Text, TextInput, Space } from "@mantine/core";
import { ENDPOINT, GuessUser } from "../App";
import { Navigate } from "react-router-dom";
import auth, { userEmail } from "../service/authService";

const GuessRand = () => {
  const [statusText, setstatusText] = useState("");
  const [guess, setGuess] = useState(" ");
  const token = localStorage.getItem("token")!;

  if (!auth(token)) {
    return <Navigate to="/login" replace />;
  }

  async function guessHandler() {
    const guessNum = Number(guess);

    let value = { Email: userEmail, Guess: guessNum };
    const updated = await fetch(`${ENDPOINT}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then((r) => r.json());

    const response = await fetch(`${ENDPOINT}/guess`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = (await response.json()) as GuessUser;

    if (result.Correct === false) {
      setstatusText("Incorrect Guess! Correct guess is: " + result.Answer);
    } else {
      setstatusText("Correct Guess");
    }
  }

  return (
    <>
      <Box
        sx={() => ({
          width: "100%",
          maxWidth: "80rem",
          margin: "0 auto",
        })}
      >
        <Text size="lg" style={{ width: "290px" }}>
          {statusText}
        </Text>
        <Space />

        <TextInput
          size="md"
          style={{ width: "290px" }}
          type="text"
          placeholder="Input your guess"
          className="form-control"
          onChange={(e) => {
            setGuess(e.target.value);
          }}
        />

        <Space h="sm" />

        <Button onClick={guessHandler}>Submit Your Guess</Button>
      </Box>
    </>
  );
};

export default GuessRand;
