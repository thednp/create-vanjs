import van from "vanjs-core";
import { Meta, Title } from "@vanjs/meta";

export const Page = () => {
  const { div, h1, p } = van.tags;
  Title("VanJS + Vite About");
  Meta({ name: "description", content: "About description" });
  return [
    div(
      { class: "flex h-screen" },
      div(
        { class: "container mx-auto p-4" },
        h1({ class: "text-5xl font-bold my-8" }, "About"),
        p("This is the about page"),
      ),
    ),
  ];
};
