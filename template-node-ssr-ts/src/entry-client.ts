import van from "vanjs-core";
import { Head, initializeHeadTags } from "@vanjs/meta";
import { hydrate } from "@vanjs/client";
import { App } from "./app";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const main = document.getElementById("main") as HTMLElement;
const header = document.getElementById("app-header") as HTMLElement;
const footer = document.getElementById("app-footer") as HTMLElement;

van.hydrate(main, (mainDom) => {
  initializeHeadTags();
  const app = App();

  // head depends on the execution of the main content
  van.hydrate(document.head, (dom) => {
    return hydrate(dom, Head());
  });
  van.hydrate(footer, (dom) => {
    return hydrate(dom, Footer());
  });
  van.hydrate(header, (dom) => {
    return hydrate(dom, Header());
  });

  return hydrate(mainDom, app);
});
