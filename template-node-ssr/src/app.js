import { Router } from "@vanjs/router";
import { Meta, Title } from "@vanjs/meta";
import "./app.css";

import "./routes";

export function App() {
  Title("VanJS + Vite App");
  Meta({ name: "description", content: "Sample app description" });

  return Router();
}
