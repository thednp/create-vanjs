import { Link } from "../components/Link";
import { ThemeToggle } from "./ui/ThemeController";
import { Github, Menu } from "vanjs-lucide";
import VanJSLogo from "/vanjs-cone.svg?van";

export const Nav = () => {
  return (
    <nav aria-label="Main Navigation" class="dropdown">
      <button type="button" class="btn btn-ghost btn-square ml-2 md:hidden">
        <span class="sr-only">Open Navigation</span>
        <Menu />
      </button>
      <ul
        class="dropdown-content menu w-48 my-2 md:my-auto bg-base-200 rounded md:bg-transparent md:w-auto md:!flex md:!relative md:menu-horizontal md:!opacity-100 md:!scale-100"
        tabindex="0"
      >
        <li>
          <Link class="aria-[current=page]:text-primary" href="/">Home</Link>
        </li>
        <li>
          <Link class="aria-[current=page]:text-primary" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link class="aria-[current=page]:text-primary" href="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const Header = () => {
  return (
    <header id="app-header" class="navbar bg-base-100">
      <Link class="py-0" href="/">
        <VanJSLogo width="2rem" height="2rem" class="w-8 h-8" />
        <span class="sr-only">My VanJS App</span>
      </Link>
      <Nav />
      <a
        class="btn btn-ghost btn-square ml-auto"
        href="https://github.com/thednp/create-vanjs"
      >
        <span class="sr-only">Create VanJS project on Github</span>
        <Github />
      </a>
      <ThemeToggle class="theme" />
    </header>
  );
};
