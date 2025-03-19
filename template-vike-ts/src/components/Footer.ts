import van from "vanjs-core";
import type { Element as VanElement } from "mini-van-plate/van-plate";
import { Link } from "./Link";

export const Footer = () => {
  const { footer, span } = van.tags;
  return footer(
    { id: "app-footer", class: "flex p-4 bg-base-100" },
    Link({ href: "/" }, span({ class: "font-bold" }, "VanJS"), " App"),
    span(
      { class: "ml-auto flex gap-1" },
      span({ class: "font-bold" }, "thednp"),
      span("©"),
      span(new Date().getFullYear()),
    ),
  ) as HTMLElement | VanElement;
};
