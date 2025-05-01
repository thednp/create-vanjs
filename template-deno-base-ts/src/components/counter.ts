import van from "vanjs-core";

const Counter = () => {
  const { button } = van.tags;
  const counter = van.state(0);
  return (
    button(
      { type: "button", onclick: () => ++counter.val },
      "Counter: ",
      counter,
    )
  );
};
export default Counter;
