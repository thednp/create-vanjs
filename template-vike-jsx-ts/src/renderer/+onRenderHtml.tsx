import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { renderToString } from "@vanjs/server";
import type { PageContextSERVER } from "../types/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { getPageMeta } from "../util/getPageMeta";
import { setPageContext } from "./usePageContext";
import "../assets/app.css";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext: PageContextSERVER,
) => {
  setPageContext(pageContext);
  const { Page } = pageContext;

  const main = await renderToString(
    <Layout pageContext={pageContext}>
      <Page />
    </Layout>,
  );
  const header = await renderToString(<Header />);
  const footer = await renderToString(<Footer />);
  const title = getPageMeta(pageContext, "title");
  const description = getPageMeta(pageContext, "description");

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/vanjs-cone.svg">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="og:title" content="${title}">
        <meta name="og:description" content="${description}">
      </head>
      <body class="flex flex-col bg-base-300">
        ${dangerouslySkipEscape(header)}
        ${dangerouslySkipEscape(main)}
        ${dangerouslySkipEscape(footer)}
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      title,
      description,
    } as PageContextSERVER,
  };
};

export { onRenderHtml };
