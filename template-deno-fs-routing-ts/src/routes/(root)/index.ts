import van from "vanjs-core";
import { Meta, Title } from "@vanjs/meta";

export const route = {};

export const Page = () => {
  const { div, h1, p } = van.tags;

  Title("VanJS + Vite Homepage");
  Meta({ name: "description", content: "Home description" });

  return [
    div(
      h1("Hello VanJS!"),
      p("This is the homepage."),
    ),
  ];
};
