import { Router } from "@vanjs/router";
import { Link, Meta, Title } from "@vanjs/meta";

export const App = () => {
  Title("VanJS + Vite App");
  Meta({ name: "description", content: "Simple SSR App with VanJS" });
  Link({ rel: "icon", href: "./vanjs-cone.svg" });

  return <Router id="main" class="main" />;
};
