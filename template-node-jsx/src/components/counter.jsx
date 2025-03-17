import van from "vanjs-core";

const Counter = () => {
  const counter = van.state(0);
  return <button onClick={() => ++counter.val}>Counter: {counter}</button>;
};

export default Counter;
