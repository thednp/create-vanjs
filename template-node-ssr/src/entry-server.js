// entry-server.js
import { renderPreloadLinks, renderToString } from "@vanjs/server";
import { setRouterState, unwrap } from "@vanjs/router";
import { Head, resetHeadTags } from "@vanjs/meta";
import { App } from "./app.js";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const template = () => {
};

export async function render(url, manifest) {
  resetHeadTags();
  setRouterState(url);

  const mainContent = unwrap(App());
  const html = await renderToString(mainContent.children);

  const headContent = unwrap(Head());
  const head = await renderToString(headContent.children);

  const headerContent = unwrap(Header());
  const header = await renderToString(headerContent.children);

  const footerContent = unwrap(Footer());
  const footer = await renderToString(footerContent.children);

  // allow code splitting for multiple pages
  // by disabling the preloading of page components
  const manifestFiles = Object.keys(manifest).filter((file) =>
    !file || !file.includes("src/pages/")
  );
  const preloadLinks = renderPreloadLinks(manifestFiles, manifest);

  return { head, html, header, footer, preloadLinks };
}
