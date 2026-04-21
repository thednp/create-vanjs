import { Router } from "@vanjs/router";
import { Meta, Title } from "@vanjs/meta";

export const App = () => {
  Title("VanJS + Vite App");
  Meta({ name: "description", content: "Simple SSR App with VanJS" });

  return <Router id="main" class="main" />;
};
