import van from "vanjs-core";
import Counter from "./components/Counter";
import "./app.css";

export const App = () => {
  return (
    <div>
      <a href="https://vite.dev" target="_blank">
        <img
          src="/vite.svg"
          class="logo"
          alt="Vite logo"
          width="96"
          height="96"
        />
      </a>

      <a href="https://vanjs.org" target="_blank">
        <img
          src="/vanjs.svg"
          class="logo vanjs"
          alt="VanJS logo"
          width="96"
          height="96"
        />
      </a>

      <h1>Hello VanJS!</h1>
      <div class="card">
        <Counter />
      </div>
      <p class="read-the-docs">Click on the VanJS logo to learn more</p>
    </div>
  );
};

const root = document.getElementById("app");

van.add(root, App());
