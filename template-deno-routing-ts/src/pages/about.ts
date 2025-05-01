import van from "vanjs-core";
import { Meta, Title } from "@vanjs/meta";
import { navigate } from "@vanjs/router";

export const Page = () => {
  const { div, h1, p, button } = van.tags;
  Title("About Page");
  Meta({ name: "description", content: "About description" });

  return [
    div(
      h1("About"),
      p("This is the about page"),
      button(
        { onclick: () => navigate("/not-found") },
        "Not found",
      ),
    ),
  ];
};
