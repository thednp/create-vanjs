import van from "vanjs-core";
import { A } from "@vanjs/router";
import { Meta, Title } from "@vanjs/meta";

export const Page = () => {
  const { div, h1, p, span } = van.tags;

  Title("404 Error: Page Not found");
  Meta({ name: "description", content: "Page Not Found Description" });

  return [
    div(
      h1(
        span("404"),
        " / ",
        "Page Not Found",
      ),
      p("This is a sample 404 page."),
      A({ class: "btn", href: "/" }, "Go Home"),
    ),
  ];
};
