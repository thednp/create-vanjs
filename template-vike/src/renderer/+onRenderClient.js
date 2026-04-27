export { onRenderClient };

import { Layout } from "../components/Layout";
import { Layout as LayoutAdmin } from "../components/LayoutAdmin";
import { hydrate } from "@vanjs/client";
import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";
import { setPageContext } from "./usePageContext";
import { applyMeta } from "../util/applyMeta";

const onRenderClient = async (
  pageContext,
) => {
  const { Page } = pageContext;
  const main = document.getElementById("main");
  const header = document.getElementById("app-header");
  // only hydrate if you have interactive/dynamic elements in Footer
  // const footer = document.getElementById("app-footer");

  const App = () => {
    setPageContext(pageContext);
    if (pageContext.pageId?.includes("/admin")) {
      return LayoutAdmin({ Page, pageContext });
    }
    return Layout({ Page, pageContext });
  };

  hydrate(header, Header())
  hydrate(main, App);
  // hydrate(footer, Footer());

  applyMeta(pageContext);
};
