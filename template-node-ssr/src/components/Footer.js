import van from "vanjs-core";
import { A } from "@vanjs/router";

export const Footer = () => {
  const { footer, span } = van.tags;
  return footer(
    { class: "footer footer-center p-4 bg-base-300 text-base-content" },
    A({ href: "/" }, span({ class: "font-bold" }, "VanJS"), " ", "App"),
    span(
      { class: "ml-auto flex gap-1" },
      span({ class: "font-bold" }, "author"),
      span("©"),
      span(new Date().getFullYear()),
    ),
  );
};
