import van from "vanjs-core";
import { App } from "./app.js";
import { Head, initializeHeadTags } from "@vanjs/meta";
import { hydrate } from "@vanjs/client";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const root = document.getElementById("app");
const header = document.getElementById("app-header");
const footer = document.getElementById("app-footer");

van.hydrate(root, (dom) => {
  initializeHeadTags();
  dom = hydrate(dom, App());

  // head depends on the execution of the main content
  van.hydrate(document.head, (head) => {
    return hydrate(head, Head());
  });
  van.hydrate(header, (h) => {
    return hydrate(h, Header());
  });
  van.hydrate(footer, (f) => {
    return hydrate(f, Footer());
  });

  return hydrate(dom, App());
});
