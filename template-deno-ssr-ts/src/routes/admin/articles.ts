import van from "vanjs-core";
import { Meta, Title } from "@vanjs/meta";
import { useRouteData } from "@vanjs/router";
import { getArticles } from "@/api";

export const route = {
  load: async (_params?: Record<string, string>) => {
    return await getArticles();
  },
};

export const Page = () => {
  const {
    h1, button, div, input, label, span, table, tbody, td, tfoot, th, thead, tr,
  } = van.tags;

  const data = useRouteData() as any;

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
                th(label(input({ type: "checkbox", class: "checkbox" }))),
                th("Title"),
                th("Category"),
                th("Author"),
                th("Details"),
              ),
            ),
            tbody(
              (() => {
                if (!data || !Array.isArray(data)) return tr(td({ colspan: "5" }, "Loading..."));
                return data.map((article: any) =>
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
                  ),
                );
              })(),
            ),
            tfoot(
              tr(th(), th("Title"), th("Category"), th("Author"), th("Details")),
            ),
          ),
        ),
      ),
    ),
  ];
};
