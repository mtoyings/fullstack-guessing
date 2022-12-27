import Login from "./components/Login";
import useSWR from "swr";

import auth from "./service/authService";

import reactLogo from "./assets/react.svg";
import "./App.css";

export const ENDPOINT = "http://localhost:9091";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import GuessingTime from "./components/GuessRand";
import MyComponent from "./components/GuessRand";

export type loginInfo = {
  Email: string;
  Password: string;
};

export type GuessUser = {
  Username: string;
  Password: string;
  Guess: number;
  Correct: boolean;
};
const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<GuessUser>("guess", fetcher);
  var token = "";
  // app.get('/all', auth, Profile)

  const correct = data?.Correct!;

  // if (localStorage.getItem("auth") !== null) {
  token = localStorage.getItem("auth")!;

  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <h1>
          {correct? "CORRECT ANSWER": "TRY AGAIN"}
        </h1> */}
        <Route path="/guess" element={<MyComponent isCorrect={correct} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
