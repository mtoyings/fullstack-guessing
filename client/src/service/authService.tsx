import { Secret } from "jsonwebtoken";
import jwtDecode from "jwt-decode";

export const SECRET_KEY: Secret = "secretkey";

interface MyObj {
  email: string;
  role: string;
  exp: number;
}

const authUser: MyObj = {
  email: "tomato@gmail.com",
  role: "potato",
  exp: 0,
};

export var userEmail: string;

function auth(token: string): boolean {
  var decodeda = jwtDecode(token);
  var decoded = jwtDecode(token) as MyObj;
  JSON.stringify(decoded);

  userEmail = decoded.email;

  const d = new Date(decoded.exp * 1000);
  // d = decoded.exp

  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  if (
    decoded.email !== "tomato@gmail.com" ||
    decoded.role !== "authorized" ||
    d < currentdate
  ) {
    console.log("role", decoded.role);
    console.log("email", decoded.email);
    console.log("d", d);

    return false;
  }

  return true;
}

export default auth;
