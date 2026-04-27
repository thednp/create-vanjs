import van from "vanjs-core";

export const Counter = () => {
  const counter = van.state(0);
  return (
    <button type="button" class="btn" onClick={() => ++counter.val}>
      Counter: {counter}
    </button>
  );
};
