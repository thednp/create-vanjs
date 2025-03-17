import { Meta, Title } from "@vanjs/meta";
import Counter from "../components/Counter";

export const Page = () => {
  Title("VanJS + Vite Homepage");
  Meta({ name: "description", content: "Home description" });

  return [
    <div class="flex h-screen">
      <div class="p-4 m-auto text-center">
        <a href="https://vite.dev" class="p-4" target="_blank">
          <img
            src="/vite.svg"
            class="h-32 w-32 p-4 inline hover:drop-shadow-[0_0_2em_#646cffaa]"
            alt="Vite logo"
            width="96"
            height="96"
          />
        </a>
        <a href="https://vanjs.org" class="p-4" target="_blank">
          <img
            src="/vanjs.svg"
            class="h-32 w-32 p-4 inline hover:drop-shadow-[0_0_2em_#f44336aa]"
            alt="VanJS logo"
            width="96"
            height="96"
          />
        </a>
        <h1 class="text-5xl font-bold my-8">
          Hello VanJS!
        </h1>
        <div class="p-8">
          <Counter />
        </div>
        <p class="my-8">
          Click on the VanJS logo to learn more
        </p>
      </div>
    </div>
  ];
};
