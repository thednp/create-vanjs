import van from "vanjs-core";
import { A } from "@vanjs/router";
import { Meta, Title } from "@vanjs/meta";

export const Page = () => {
  const { div, h1, p, span } = van.tags;

  Title("404 Error: Admin Page Not found");
  Meta({ name: "description", content: "Admin Page Not Found Description" });

  return [
    div(
      { class: "flex h-screen" },
      div(
        { class: "container mx-auto p-4" },
        h1(
          { class: "text-5xl my-8" },
          span({ class: "font-bold" }, "404"),
          " / ",
          "Admin Page Not Found",
        ),
        p({ class: "mb-4" }, "This is the administrator error page"),
        A({ class: "btn", href: "/admin" }, "Dashboard"),
      ),
    ),
  ];
};
