import van from "vanjs-core";
import { usePageContext } from "../../../renderer/usePageContext";

export const Page = () => {
  const pc = usePageContext();
  const categories = pc.data;

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

  const rows = categories?.map((cat) =>
    tr(
      th(label(input({ type: "checkbox", class: "checkbox" }))),
      td(
        div(
          { class: "flex items-center gap-3" },
          div(div({ class: "font-bold" }, cat.title)),
        ),
      ),
      td(span({ class: "badge badge-ghost badge-sm" }, cat.author)),
      th(button({ class: "btn btn-ghost btn-xs" }, "details")),
    )
  ) ?? [];

  return div(
    { class: "h-screen" },
    div(
      { class: "p-4 m-auto" },
      h1({ class: "text-5xl font-bold my-8" }, "Categories"),
      div(
        { class: "overflow-x-auto" },
        table(
          { class: "table" },
          thead(
            tr(
              th(label(input({ type: "checkbox", class: "checkbox" }))),
              th("Title"),
              th("Author"),
              th("Details"),
            ),
          ),
          tbody(...rows),
          tfoot(
            tr(
              th(),
              th("Title"),
              th("Author"),
              th("Details"),
            ),
          ),
        ),
      ),
    ),
  );
};
