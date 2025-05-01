import van from "vanjs-core";
import { Link } from "../../components/Link";
import { usePageContext } from "../../renderer/usePageContext";

export function Page() {
  const pageContext = usePageContext();
  const { is404 } = pageContext;
  const { div, h1, span, p } = van.tags;

  return div(
    { class: "flex h-screen" },
    div(
      { class: "container mx-auto p-4" },
      h1(
        { class: "text-5xl my-8" },
        is404
          ? span(
            span({ class: "font-bold" }, "404"),
            " / ",
            "Page Not Found",
          )
          : "An Error has occured",
      ),
      p({ class: "mb-4" }, "This is an error page"),
      Link({ class: "btn", href: "/" }, "Go Home"),
    ),
  );
}
