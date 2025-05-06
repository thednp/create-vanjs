import van from "vanjs-core";

export const Page = () => {
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
              th(
                label(
                  input({ type: "checkbox", class: "checkbox" }),
                ),
              ),
              th("Title"),
              th("Author"),
              th("Details"),
            ),
          ),
          tbody(
            tr(
              th(
                label(
                  input({ type: "checkbox", class: "checkbox" }),
                ),
              ),
              td(
                div(
                  { class: "flex items-center gap-3" },
                  div(
                    div({ class: "font-bold" }, "Science"),
                  ),
                ),
              ),
              td(
                span({ class: "badge badge-ghost badge-sm" }, "Jane Doe"),
              ),
              th(
                button({ class: "btn btn-ghost btn-xs" }, "details"),
              ),
            ),
            tr(
              th(
                label(
                  input({ type: "checkbox", class: "checkbox" }),
                ),
              ),
              td(
                div(
                  { class: "flex items-center gap-3" },
                  div(
                    div({ class: "font-bold" }, "Economics"),
                  ),
                ),
              ),
              td(
                span({ class: "badge badge-ghost badge-sm" }, "Jim Cramer"),
              ),
              th(
                button({ class: "btn btn-ghost btn-xs" }, "details"),
              ),
            ),
            tr(
              th(
                label(
                  input({ type: "checkbox", class: "checkbox" }),
                ),
              ),
              td(
                div(
                  { class: "flex items-center gap-3" },
                  div(
                    div({ class: "font-bold" }, "Health"),
                  ),
                ),
              ),
              td(
                span({ class: "badge badge-ghost badge-sm" }, "Waren Lee"),
              ),
              th(
                button({ class: "btn btn-ghost btn-xs" }, "details"),
              ),
            ),
            tr(
              th(
                label(
                  input({ type: "checkbox", class: "checkbox" }),
                ),
              ),
              td(
                div(
                  { class: "flex items-center gap-3" },
                  div(
                    div(
                      { class: "font-bold" },
                      "Sports",
                    ),
                  ),
                ),
              ),
              td(
                span({ class: "badge badge-ghost badge-sm" }, "Jane Doe"),
              ),
              th(
                button({ class: "btn btn-ghost btn-xs" }, "details"),
              ),
            ),
          ),
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
