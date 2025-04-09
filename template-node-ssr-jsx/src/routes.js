import { lazy, Route } from "@vanjs/router";
import { Page } from "./pages/home";

// Register routes
Route({
  path: "/",
  component: Page,
});

Route({
  path: "/about",
  component: lazy(() => import("./pages/about")),
});

Route({
  path: "*",
  component: lazy(() => import("./pages/not-found")),
});
