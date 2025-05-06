import van from "vanjs-core";

export const Counter = () => {
  const counter = van.state(0);
  return (
    <button class="btn" type="button" onclick={() => ++counter.val}>
      Counter: {counter}
    </button>
  );
};
