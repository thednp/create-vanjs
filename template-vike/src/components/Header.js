import van from "vanjs-core";
import { /*ThemeDropdown,*/ ThemeToggle } from "./ui/ThemeController";
import { Github, Menu } from "vanjs-lucide";
import VanJSLogo from "/vanjs-cone.svg?van";
import { Link } from "./Link";

export const Nav = () => {
  const { nav, ul, li, button, span } = van.tags;
  return nav(
    { ariaLabel: "Main Navigation", class: "dropdown" },
    button(
      {
        class: "btn btn-ghost btn-square ml-2 md:hidden",
      },
      span({ class: "sr-only" }, "Open Navigation"),
      Menu(),
    ),
    ul(
      {
        class:
          "dropdown-content menu w-48 my-2 md:my-auto bg-base-200 rounded md:bg-transparent md:w-auto md:!flex md:!relative md:menu-horizontal md:!opacity-100 md:!scale-100",
        tabindex: "0",
      },
      li(
        Link({ class: "aria-[current=page]:text-primary", href: "/" }, "Home"),
      ),
      li(
        Link(
          { class: "aria-[current=page]:text-primary", href: "/about" },
          "About",
        ),
      ),
      li(
        Link(
          { class: "aria-[current=page]:text-primary", href: "/admin" },
          "Admin",
        ),
      ),
    ),
  );
};

export const Header = () => {
  const { header, a, span } = van.tags;
  return header(
    { id: "app-header", class: "navbar bg-base-100" },
    Link(
      { class: "py-0", href: "/" },
      VanJSLogo({ width: "2rem", height: "2rem", class: "w-8 h-8" }),
      span({ class: "sr-only" }, "My VanJS App"),
    ),
    Nav(),
    a(
      {
        class: "btn btn-ghost btn-square ml-auto",
        href: "https://github.com/thednp/create-vanjs",
      },
      span({ class: "sr-only" }, "Create VanJS project on Github"),
      Github(),
    ),
    ThemeToggle({ class: "theme" }),
    // ThemeDropdown({ class: "theme" }),
  );
};
