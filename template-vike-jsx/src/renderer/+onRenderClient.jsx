export { onRenderClient };

import van from "vanjs-core";
import { Layout } from "../components/Layout";
import { hydrate } from "@vanjs/client";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setPageContext } from "./usePageContext";
import { applyMeta } from "../util/applyMeta";

const onRenderClient = async (
  pageContext,
) => {
  const { Page } = pageContext;
  const main = document.getElementById("main");
  const header = document.getElementById("app-header");
  const footer = document.getElementById("app-footer");
  const App = () => {
    setPageContext(pageContext);
    return (
      <Layout pageContext={pageContext}>
        <Page />
      </Layout>
    );
  };

  van.hydrate(main, (dom) => hydrate(dom, <App />));
  van.hydrate(header, (dom) => hydrate(dom, <Header />));
  van.hydrate(footer, (dom) => hydrate(dom, <Footer />));

  applyMeta(pageContext);
};
