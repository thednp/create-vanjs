import van from "vanjs-core";
import { Router } from "@vanjs/router";
import "./app.css";
import "./routes";

export const App = () => {
  return Router();
};

const root = document.getElementById("app");

van.add(root, App());
