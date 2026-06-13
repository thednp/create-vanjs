import van from "vanjs-core";
import { Meta, Title } from "@vanjs/meta";
import { useRouteData } from "@vanjs/router";
import { getUsers } from "@/api";

export const route = {
  load: async (_params) => {
    return await getUsers();
  },
};

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

  const data = useRouteData();

  Title("Users");
  Meta({ name: "description", content: "Users description" });

  return [
    div(
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
            tbody(
              (() => {
                if (!data || !Array.isArray(data)) {
                  return tr(td({ colspan: "5" }, "Loading..."));
                }
                return data.map((user) =>
                  tr(
                    th(label(input({ type: "checkbox", class: "checkbox" }))),
                    td(
                      div(
                        { class: "flex items-center gap-3" },
                        div(
                          { class: "avatar" },
                          div(
                            { class: "mask mask-squircle h-12 w-12" },
                            img({
                              src: user.avatar,
                              alt: "Avatar Tailwind CSS Component",
                            }),
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
                );
              })(),
            ),
            tfoot(
              tr(th(), th("Name"), th("Job"), th("Favorite Color"), th()),
            ),
          ),
        ),
      ),
    ),
  ];
};
