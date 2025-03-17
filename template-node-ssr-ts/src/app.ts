// import van from 'vanjs-core';
import { Router } from "@vanjs/router";
import { Link, Meta, Title } from "@vanjs/meta";
import "./routes";

export function App() {
  Title("VanJS + Vite App");
  Meta({ name: "description", content: "Simple SSR App with VanJS" });
  Link({ rel: "icon", href: "./vanjs-cone.svg" });

  return Router({ id: "main" });
}
