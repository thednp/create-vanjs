export { onRenderClient };

import van from "vanjs-core";
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
  // const footer = document.getElementById("app-footer");
  const App = () => {
    setPageContext(pageContext);
    return (
      pageContext.pageId?.includes("/admin")
        ? (
          <LayoutAdmin pageContext={pageContext}>
            <Page />
          </LayoutAdmin>
        )
        : (
          <Layout pageContext={pageContext}>
            <Page />
          </Layout>
        )
    );
  };


  hydrate(header, <Header />);
  hydrate(main, () => <App />);

  applyMeta(pageContext);
};
