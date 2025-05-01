import { lazy, Route } from "@vanjs/router";
import { Page as NotFound } from "./pages/not-found";
import Layout from "./components/layout";

Route({
  path: "/",
  component: lazy(() => {
    const importFn = async () => {
      const IndexModule = await import("./pages/index");
      const { Page, route } = IndexModule;
      return Promise.resolve({
        route,
        Page: () => Layout({ children: Page() }),
      });
    };
    return importFn();
  }),
});

Route({
  path: "/about",
  component: lazy(() => {
    const importFn = async () => {
      const { Page } = await import("./pages/about");
      return Promise.resolve({
        Page: () => Layout({ children: Page() }),
      });
    };
    return importFn();
  }),
});

Route({
  path: "*",
  component: () => Layout({ children: NotFound() }),
});
