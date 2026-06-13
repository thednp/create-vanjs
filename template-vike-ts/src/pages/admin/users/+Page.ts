import van from "vanjs-core";
import { usePageContext } from "../../../renderer/usePageContext";
import type { User } from "./+data";

export const Page = () => {
  const { data } = usePageContext();
  const users = data as User[];

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

  const rows = users?.map((user) =>
    tr(
      th(label(input({ type: "checkbox", class: "checkbox" }))),
      td(
        div(
          { class: "flex items-center gap-3" },
          div(
            { class: "avatar" },
            div(
              { class: "mask mask-squircle h-12 w-12" },
              img({ src: user.avatar, alt: "Avatar" }),
            ),
          ),
          div(
            div({ class: "font-bold" }, user.name),
            div({ class: "text-sm opacity-50" }, user.country),
          ),
        ),
      ),
      td(
        user.company,
        br(),
        span({ class: "badge badge-ghost badge-sm" }, user.job),
      ),
      td(user.color),
      th(button({ class: "btn btn-ghost btn-xs" }, "details")),
    )
  ) ?? [];

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
              th(label(input({ type: "checkbox", class: "checkbox" }))),
              th("Name"),
              th("Job"),
              th("Favorite Color"),
              th(),
            ),
          ),
          tbody(...rows),
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
