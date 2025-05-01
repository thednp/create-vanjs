import van from "vanjs-core";
import { Router } from "@vanjs/router";
import "./app.css";

export const App = () => {
  return Router();
};

const root = document.getElementById("app") as HTMLElement;

van.add(root, App());
