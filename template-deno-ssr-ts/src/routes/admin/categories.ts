import van from "vanjs-core";
import { Meta, Title } from "@vanjs/meta";
import { useRouteData } from "@vanjs/router";
import { getCategories } from "@/api";

export const route = {
  load: async (_params?: Record<string, string>) => {
    return await getCategories();
  },
};

export const Page = () => {
  const {
    h1, button, div, input, label, span, table, tbody, td, tfoot, th, thead, tr,
  } = van.tags;

  const data = useRouteData() as any;

  Title("Categories");
  Meta({ name: "description", content: "Categories description" });

  return [
    div(
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
            tbody(
              (() => {
                if (!data || !Array.isArray(data)) return tr(td({ colspan: "4" }, "Loading..."));
                return data.map((cat: any) =>
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
                  ),
                );
              })(),
            ),
            tfoot(
              tr(th(), th("Title"), th("Author"), th("Details")),
            ),
          ),
        ),
      ),
    ),
  ];
};
