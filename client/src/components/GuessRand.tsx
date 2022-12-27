import { useState } from "react";
import { useForm } from "@mantine/hooks";
import {
  Box,
  Button,
  Text,
  TextInput,
} from "@mantine/core";
import { ENDPOINT, GuessUser } from "../App";
import { Navigate } from "react-router-dom";
import auth, { userEmail } from "../service/authService";

type Props = {
  isCorrect: boolean;
};
const MyComponent: React.FC<Props> = ({ isCorrect }) => {
  const [statusText, setstatusText] = useState("");

  console.log("isCorrect", isCorrect);

    const token = localStorage.getItem("auth")!;
    
  if (!auth(token)) {
    console.log("SHES UNAUTH");
    return <Navigate to="/login" replace />;
  }

  console.log("BELLO");
  const form = useForm({
    initialValues: {
      email: userEmail,
      guess: null,
    },
  });

  async function userGuessing(values: { username: string; guess: number }) {
    console.log("Hello", values);
    values = values!;
    values.guess = Number(values.guess);
    const updated = await fetch(`${ENDPOINT}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());
    console.log("Test", values);
    form.reset();

    const response = await fetch(`${ENDPOINT}/guess`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = (await response.json()) as GuessUser;
    console.log("who", result);

    if (result.Correct === false) {
      setstatusText("Try Again");
    } else {
      setstatusText("Correct Guess");
    }
  }

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: "2rem",
          width: "100%",
          maxWidth: "40rem",
          margin: "0 auto",
        })}
      >
        <Text size="xl" weight={"bolder"}>
          {statusText}
        </Text>

        <form onSubmit={form.onSubmit(userGuessing)}>
          <TextInput
            mb={12}
            placeholder="Input your guess"
            {...form.getInputProps("guess")}
          />
          <Button type="submit">Submit Your Guess</Button>
        </form>
      </Box>
    </>
  );
};

// export default GuessingTime
export default MyComponent;
