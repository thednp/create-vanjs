export { onRenderClient };

import van from "vanjs-core";
import { Layout } from "../components/Layout";
import type { OnRenderClientAsync } from "vike/types";
import { hydrate } from "@vanjs/client";
import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";
import { setPageContext } from "./usePageContext";
import { applyMeta } from "../util/applyMeta";

const onRenderClient: OnRenderClientAsync = async (
  pageContext,
) => {
  const { Page } = pageContext;
  const main = document.getElementById("main") as HTMLElement;
  const header = document.getElementById("app-header") as HTMLElement;
  // only hydrate if you have interactive/dynamic elements in Footer
  // const footer = document.getElementById("app-footer") as HTMLElement;

  const App = () => {
    setPageContext(pageContext);
    return Layout({ Page, pageContext }) as HTMLElement;
  };

  van.hydrate(main, (mainDom) => {
    van.hydrate(header, (dom) => hydrate(dom, Header()));
    // only hydrate if you have interactive/dynamic elements in Footer
    // van.hydrate(footer, (dom) => hydrate(dom, Footer()));

    return hydrate(mainDom, App());
  });

  applyMeta(pageContext);
};
