import { Secret } from "jsonwebtoken";
import jwtDecode from "jwt-decode";

export const SECRET_KEY: Secret = "secretkey";

interface MyObj {
  email: string;
  role: string;
  exp: number;
}

export var userEmail: string;

function auth(token: string): boolean {
  var decodeda = jwtDecode(token);
  var decoded = jwtDecode(token) as MyObj;
  JSON.stringify(decoded);
  userEmail = decoded.email;
  const exp = new Date(decoded.exp * 1000);

  var currentdate = new Date();

  if (
    decoded.email !== "test@gmail.com" ||
    decoded.role !== "authorized" ||
    exp < currentdate
  ) {
    return false;
  }

  return true;
}

export default auth;
