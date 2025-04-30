import van from "vanjs-core";
import { hydrate } from "@vanjs/client";
import { App } from "./app";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const main = document.getElementById("main") as HTMLElement;
const header = document.getElementById("app-header") as HTMLElement;
const footer = document.getElementById("app-footer") as HTMLElement;

van.hydrate(main, (mainDom) => {
  van.hydrate(header, (dom) => {
    return hydrate(dom, <Header />);
  });
  van.hydrate(footer, (dom) => {
    return hydrate(dom, <Footer />);
  });

  return hydrate(mainDom, <App />);
});
