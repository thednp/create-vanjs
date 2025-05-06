import van from "vanjs-core";
import Counter from "../../components/Counter";

export const Page = () => {
  const { div, h1, p } = van.tags;
  return div(
    { class: "flex h-screen" },
    div(
      { class: "container mx-auto p-4" },
      h1({ class: "text-5xl font-bold my-8" }, "Hello VanJS!"),
      p({ class: "mb-4" }, "This is your homepage."),
      Counter(),
    ),
  );
};
