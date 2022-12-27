import { Button, Box, TextInput, Text, Space } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../App";

function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var token = "";
  // const history = useHistory();

  async function loginHandler() {
    let item = { email, password };
    let result = await fetch(`${ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => result.json());

    navigate("/guess");

    console.log("jker", result);
    localStorage.setItem("auth", result.token);
  }

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: "1rem",
          width: "100%",
          maxWidth: "50rem",
          margin: "0 auto",
        })}
      >
        <Text size="xl" weight={"bolder"}>
          {" "}
          Welcome!{" "}
        </Text>
        <Space h="md" />

        <TextInput
          type="text"
          placeholder="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Space h="md" />

        <TextInput
          type="text"
          placeholder="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Space h="md" />
        <Button onClick={loginHandler}>Login</Button>
      </Box>
    </>
  );
}

export default Login;
