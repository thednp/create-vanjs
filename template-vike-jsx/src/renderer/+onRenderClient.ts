import van from "vanjs-core";
import { Layout } from "../components/Layout";
import type { PageContextCLIENT } from "../types/types";
import type { OnRenderClientAsync } from "vike/types";
import { hydrate } from "@vanjs/client";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setPageContext } from "./usePageContext";
import { applyMeta } from "../util/applyMeta";

let app: HTMLElement;
const onRenderClient: OnRenderClientAsync = async (
  pageContext: PageContextCLIENT,
) => {
  const { Page } = pageContext;
  setPageContext(pageContext);
  const main = document.getElementById("main") as HTMLElement;
  const header = document.getElementById("app-header") as HTMLElement;
  const footer = document.getElementById("app-footer") as HTMLElement;

  if (!app) {
    app = Layout({ Page, pageContext }) as HTMLElement;
    if (pageContext.isHydration) {
      van.hydrate(main, (dom) => hydrate(dom, app));
      van.hydrate(header, (dom) => hydrate(dom, Header() as HTMLElement));
      // only hydrate if you have interactive elements in Footer
      // van.hydrate(footer, (dom) => hydrate(dom, Footer() as HTMLElement));
    } else {
      van.add(main, app);
      van.add(header, Header() as HTMLElement);
      van.add(footer, Footer() as HTMLElement);
    }
  } else {
    const newApp = Layout({ Page, pageContext }) as HTMLElement;
    app.replaceWith(newApp);
    app = newApp;
    header.replaceWith(Header() as HTMLElement);
    main.replaceWith(app);
    // only update if you have interactive elements in Footer
    // footer.replaceWith(Footer() as HTMLElement);
  }

  applyMeta(pageContext);
};

export { onRenderClient };
