export { onRenderHtml };

import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { renderToString } from "@vanjs/server";
import type { PageContextSERVER } from "../types/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { Layout as LayoutAdmin } from "../components/LayoutAdmin";
import { getPageMeta } from "../util/getPageMeta";
import "../assets/app.css";
import { setPageContext } from "./usePageContext";

const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const { Page } = pageContext;
  setPageContext(pageContext);
  const main = pageContext.pageId?.includes("/admin")
    ? await renderToString(LayoutAdmin({ Page, pageContext }))
    : await renderToString(Layout({ Page, pageContext }));
  const header = await renderToString(Header());
  const footer = await renderToString(Footer());
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
