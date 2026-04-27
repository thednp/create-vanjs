import van from "vanjs-core";
import { A } from "@vanjs/router";
import type { Element as VanElement } from "mini-van-plate/van-plate";

export const Footer = () => {
  const { footer, span } = van.tags;
  return footer(
    { id: "app-footer", class: "flex p-4 bg-base-100" },
    A({ href: "/" }, span({ class: "font-bold" }, "VanJS"), " App"),
    span(
      { class: "ml-auto flex gap-1" },
      span({ class: "font-bold" }, "author"),
      span("©"),
      span(new Date().getFullYear()),
    ),
  ) as HTMLElement | VanElement;
};
