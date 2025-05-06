import van from "vanjs-core";
import { A } from "@vanjs/router";

export const Page = () => {
  const { div, button, h1 } = van.tags;

  return div(
    { class: "h-screen" },
    div(
      { class: "p-4 m-auto" },
      h1({ class: "text-5xl font-bold my-8" }, "Hello Administrator!"),
      div(
        { class: "flex flex-col md:flex-row gap-4" },
        div(
          {
            class: "w-full lg:w-1/2 stats bg-base-100 border border-base-300",
          },
          div(
            { class: "stat" },
            div({ class: "stat-title" }, "This month sales"),
            div({ class: "stat-value" }, "$89,400"),
            div(
              { class: "stat-actions" },
              A(
                { class: "btn btn-xs", href: "/admin/not-found" },
                "Not found",
              ),
            ),
          ),
          div(
            { class: "stat" },
            div({ class: "stat-title" }, "Conversion rate"),
            div({ class: "stat-value" }, "$576"),
            div(
              { class: "stat-actions" },
              button({ class: "btn btn-xs btn-success" }, "Cashflow"),
              button({ class: "btn btn-xs" }, "Trends"),
            ),
          ),
        ),
        div(
          {
            class: "w-full lg:w-1/2 stats bg-base-100 border border-base-300",
          },
          div(
            { class: "stat" },
            div({ class: "stat-title" }, "Monthly Views"),
            div({ class: "stat-value" }, "47,558"),
            div(
              { class: "stat-actions" },
              button({ class: "btn btn-xs" }, "Analytics"),
            ),
          ),
          div(
            { class: "stat" },
            div({ class: "stat-title" }, "Today's Views"),
            div({ class: "stat-value" }, "1,553"),
            div(
              { class: "stat-actions" },
              button({ class: "btn btn-xs" }, "Estaimated"),
            ),
          ),
        ),
      ),
    ),
  );
};
