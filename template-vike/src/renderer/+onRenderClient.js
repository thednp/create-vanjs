import van from "vanjs-core";
import { Layout } from "../components/Layout";
import { hydrate } from "@vanjs/client";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setPageContext } from "./usePageContext";
import { applyMeta } from "../util/applyMeta";

/** @typedef {import("../types/types.ts").PageContextCLIENT} PageContextCLIENT */
/** @typedef {import("vike/types").OnRenderClientAsync} OnRenderClientAsync */

let app;

/**
 * @param {PageContextCLIENT} pageContext
 * @type {OnRenderClientAsync}
 */
const onRenderClient = async (pageContext) => {
  const { Page } = pageContext;
  setPageContext(pageContext);
  const main = document.getElementById("main");
  const header = document.getElementById("app-header");
  const footer = document.getElementById("app-footer");

  if (!app) {
    app = Layout({ Page, pageContext });
    if (pageContext.isHydration) {
      van.hydrate(main, (dom) => hydrate(dom, app));
      van.hydrate(header, (dom) => hydrate(dom, Header()));
      // only hydrate if you have interactive elements in Footer
      // van.hydrate(footer, (dom) => hydrate(dom, Footer() as HTMLElement));
    } else {
      van.add(main, app);
      van.add(header, Header());
      van.add(footer, Footer());
    }
  } else {
    const newApp = Layout({ Page, pageContext });
    app.replaceWith(newApp);
    app = newApp;
    header.replaceWith(Header());
    main.replaceWith(app);
    // only update if you have interactive elements in Footer
    // footer.replaceWith(Footer() as HTMLElement);
  }

  applyMeta(pageContext);
};

export { onRenderClient };
