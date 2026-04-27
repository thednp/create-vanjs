import van from "vanjs-core";
import { A, useRouteData } from "@vanjs/router";
import { Meta, Title } from "@vanjs/meta";
import { getDashboardStats } from "@/api";

export const route = {
  load: async () => {
    return await getDashboardStats();
  },
};

export const Page = () => {
  const { div, button, h1 } = van.tags;
  const data = useRouteData();


  Title("Dashboard");
  Meta({ name: "description", content: "Administrator description" });

  return [
    div(
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
              div({ class: "stat-value" }, data?.monthlySales || "--"),
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
              div({ class: "stat-value" },  data?.conversionRate || "--"),
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
              div({ class: "stat-value" }, data?.monthlyViews || "--"),
              div(
                { class: "stat-actions" },
                button({ class: "btn btn-xs" }, "Analytics"),
              ),
            ),
            div(
              { class: "stat" },
              div({ class: "stat-title" }, "Today's Views"),
              div({ class: "stat-value" }, data?.todayViews || "--"),
              div(
                { class: "stat-actions" },
                button({ class: "btn btn-xs" }, "Estaimated"),
              ),
            ),
          ),
        ),
      ),
    ),
  ];
};
