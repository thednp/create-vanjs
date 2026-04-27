import { hydrate } from "@vanjs/client";
import { App } from "./App";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const main = document.getElementById("main");
const header = document.getElementById("app-header");
const footer = document.getElementById("app-footer");

hydrate(header, Header());
hydrate(main, App);
hydrate(footer, Footer());
