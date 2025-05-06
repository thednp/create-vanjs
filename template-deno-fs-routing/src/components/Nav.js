import van from "vanjs-core";
import { A } from "@vanjs/router";

export default () => {
  const { nav, ul, li } = van.tags;
  return nav(
    { ariaLabel: "Main Navigation" },
    ul(
      {
        style:
          "display: flex; gap: 0.5rem; list-style: none; margin:0; padding: 0;",
      },
      li(
        A({ class: "aria-[current=page]:text-primary", href: "/" }, "Home"),
      ),
      li(
        A(
          { class: "aria-[current=page]:text-primary", href: "/about" },
          "About",
        ),
      ),
    ),
  );
};
