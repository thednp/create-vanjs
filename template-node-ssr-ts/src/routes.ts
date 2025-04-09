import { lazy, Route } from "@vanjs/router";
import { Home, route } from "./pages/home";

// Register routes
Route({
  ...route,
  path: "/",
  component: Home,
});

Route({
  path: "/about",
  component: lazy(() => import("./pages/about")),
});

Route({
  path: "*",
  component: lazy(() => import("./pages/not-found")),
});
