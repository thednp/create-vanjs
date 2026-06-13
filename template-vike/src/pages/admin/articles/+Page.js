import van from "vanjs-core";
import { usePageContext } from "../../../renderer/usePageContext";

export const Page = () => {
  const pc = usePageContext();
  const articles = pc.data;

  const {
    h1,
    button,
    div,
    input,
    label,
    span,
    table,
    tbody,
    td,
    tfoot,
    th,
    thead,
    tr,
  } = van.tags;

  const rows = articles?.map((article) =>
    tr(
      th(label(input({ type: "checkbox", class: "checkbox" }))),
      td(
        div(
          { class: "flex items-center gap-3" },
          div(div({ class: "font-bold" }, article.title)),
        ),
      ),
      td(span({ class: "badge badge-ghost badge-sm" }, article.category)),
      td(article.author),
      th(button({ class: "btn btn-ghost btn-xs" }, "details")),
    )
  ) ?? [];

  return div(
    { class: "h-screen" },
    div(
      { class: "p-4 m-auto" },
      h1({ class: "text-5xl font-bold my-8" }, "Articles"),
      div(
        { class: "overflow-x-auto" },
        table(
          { class: "table" },
          thead(
            tr(
              th(label(input({ type: "checkbox", class: "checkbox" }))),
              th("Title"),
              th("Category"),
              th("Author"),
              th("Details"),
            ),
          ),
          tbody(...rows),
          tfoot(
            tr(
              th(),
              th("Title"),
              th("Category"),
              th("Author"),
              th("Details"),
            ),
          ),
        ),
      ),
    ),
  );
};
