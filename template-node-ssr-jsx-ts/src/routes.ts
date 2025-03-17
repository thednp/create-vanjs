import { lazy, Route } from "@vanjs/router";

// Register routes
Route({
  path: "/",
  component: lazy(() => import("./pages/home")),
});

Route({
  path: "/about",
  component: lazy(() => import("./pages/about")),
});

Route({
  path: "*",
  component: lazy(() => import("./pages/not-found")),
});
