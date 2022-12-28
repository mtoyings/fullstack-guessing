import Login from "./components/Login";
import useSWR from "swr";
import "./App.css";
export const ENDPOINT = "http://localhost:9091";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GuessRand from "./components/GuessRand";

export type loginInfo = {
  Email: string;
  Password: string;
};

export type GuessUser = {
  Email: string;
  Guess: number;
  Correct: boolean;
  Answer: number;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/guess" element={<GuessRand />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
