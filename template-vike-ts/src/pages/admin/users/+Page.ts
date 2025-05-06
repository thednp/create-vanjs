import van from "vanjs-core";

export const Page = () => {
  const {
    h1,
    br,
    button,
    div,
    img,
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
      h1({ class: "text-5xl font-bold my-8" }, "Users"),
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
              th("Name"),
              th("Job"),
              th("Favorite Color"),
              th(),
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
                    { class: "avatar" },
                    div(
                      { class: "mask mask-squircle h-12 w-12" },
                      img({
                        src:
                          "https://img.daisyui.com/images/profile/demo/2@94.webp",
                        alt: "Avatar Tailwind CSS Component",
                      }),
                    ),
                  ),
                  div(
                    div({ class: "font-bold" }, "Hart Hagerty"),
                    div({ class: "text-sm opacity-50" }, "United States"),
                  ),
                ),
              ),
              td(
                "Zemlak, Daniel and Leannon",
                br(),
                span(
                  { class: "badge badge-ghost badge-sm" },
                  "Desktop Support Technician",
                ),
              ),
              td("Purple"),
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
                    { class: "avatar" },
                    div(
                      { class: "mask mask-squircle h-12 w-12" },
                      img({
                        src:
                          "https://img.daisyui.com/images/profile/demo/3@94.webp",
                        alt: "Avatar Tailwind CSS Component",
                      }),
                    ),
                  ),
                  div(
                    div({ class: "font-bold" }, "Brice Swyre"),
                    div({ class: "text-sm opacity-50" }, "China"),
                  ),
                ),
              ),
              td(
                "Carroll Group",
                br(),
                span(
                  { class: "badge badge-ghost badge-sm" },
                  "Tax Accountant",
                ),
              ),
              td(
                "Red",
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
                    { class: "avatar" },
                    div(
                      { class: "mask mask-squircle h-12 w-12" },
                      img({
                        src:
                          "https://img.daisyui.com/images/profile/demo/4@94.webp",
                        alt: "Avatar Tailwind CSS Component",
                      }),
                    ),
                  ),
                  div(
                    div({ class: "font-bold" }, "Marjy Ferencz"),
                    div({ class: "text-sm opacity-50" }, "Russia"),
                  ),
                ),
              ),
              td(
                "Rowe-Schoen",
                br(),
                span(
                  { class: "badge badge-ghost badge-sm" },
                  "Office Assistant I",
                ),
              ),
              td(
                "Crimson",
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
                    { class: "avatar" },
                    div(
                      { class: "mask mask-squircle h-12 w-12" },
                      img({
                        src:
                          "https://img.daisyui.com/images/profile/demo/5@94.webp",
                        alt: "Avatar Tailwind CSS Component",
                      }),
                    ),
                  ),
                  div(
                    div({ class: "font-bold" }, "Yancy Tear"),
                    div({ class: "text-sm opacity-50" }, "Brazil"),
                  ),
                ),
              ),
              td(
                "Wyman-Ledner",
                br(),
                span(
                  { class: "badge badge-ghost badge-sm" },
                  "Community Outreach Specialist",
                ),
              ),
              td("Indigo"),
              th(
                button({ class: "btn btn-ghost btn-xs" }, "details"),
              ),
            ),
          ),
          tfoot(
            tr(
              th(),
              th("Name"),
              th("Job"),
              th("Favorite Color"),
              th(),
            ),
          ),
        ),
      ),
    ),
  );
};
