import van from "vanjs-core";
import { hydrate } from "@vanjs/client";
import { App } from "./app";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const main = document.getElementById("main");
const header = document.getElementById("app-header");
const footer = document.getElementById("app-footer");

van.hydrate(main, (mainDom) => {
  const app = <App />;

  van.hydrate(footer, (dom) => {
    return hydrate(dom, <Footer />);
  });
  van.hydrate(header, (dom) => {
    return hydrate(dom, <Header />);
  });

  return hydrate(mainDom, app);
});
