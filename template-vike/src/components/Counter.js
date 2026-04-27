import van from "vanjs-core";

export const Counter = () => {
  const { button } = van.tags;
  const counter = van.state(0);
  return (
    button({ class: "btn", onclick: () => ++counter.val }, "Counter: ", counter)
  );
};
