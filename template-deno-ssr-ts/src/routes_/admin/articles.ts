import van from "vanjs-core";
import { Meta, Title } from "@vanjs/meta";

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

  Title("Articles");
  Meta({ name: "description", content: "Articles description" });

  return [
    div(
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
                th(
                  label(
                    input({ type: "checkbox", class: "checkbox" }),
                  ),
                ),
                th("Title"),
                th("Category"),
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
                      div(
                        { class: "font-bold" },
                        "Silicone fabs are running out of water",
                      ),
                    ),
                  ),
                ),
                td(
                  span({ class: "badge badge-ghost badge-sm" }, "Tech"),
                ),
                td("Jane Doe"),
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
                        "WEF to hold the annual meeting later than originally planned",
                      ),
                    ),
                  ),
                ),
                td(
                  span({ class: "badge badge-ghost badge-sm" }, "Economics"),
                ),
                td("Yannik Eisen"),
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
                        "Relativity theory challenged by young student",
                      ),
                    ),
                  ),
                ),
                td(
                  span({ class: "badge badge-ghost badge-sm" }, "Science"),
                ),
                td("Mara Lane"),
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
                        "Last chance to join the 8th of March event",
                      ),
                    ),
                  ),
                ),
                td(
                  span({ class: "badge badge-ghost badge-sm" }, "Community"),
                ),
                td("Jimmy Delores"),
                th(
                  button({ class: "btn btn-ghost btn-xs" }, "details"),
                ),
              ),
            ),
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
    ),
  ];
};
