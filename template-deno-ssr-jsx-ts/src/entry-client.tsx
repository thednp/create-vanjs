import { hydrate } from "@vanjs/client";
import { App } from "./App";
import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";

const main = document.getElementById("main") as HTMLElement;
const header = document.getElementById("app-header") as HTMLElement;
// const footer = document.getElementById("app-footer") as HTMLElement;

hydrate(header, <Header />);
hydrate(main, () => <App />);
// hydrate(footer, <Footer />);
