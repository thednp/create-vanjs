import van from "vanjs-core";
import { Link } from "../../components/Link";

export function Page() {
  const { div, h1, p } = van.tags;

  return div(
    { class: "flex h-screen" },
    div(
      { class: "container mx-auto p-4" },
      h1({ class: "text-5xl font-bold my-8" }, "About"),
      p("This is the about page"),
      Link({ class: "btn", href: "/not-found" }, "Not found"),
    ),
  );
}
