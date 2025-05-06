import { Meta, Title } from "@vanjs/meta";
import { Counter } from "../components/Counter";

export default () => {
  Title("VanJS + Vite Homepage");
  Meta({ name: "description", content: "Home description" });

  return [
    <div class="flex h-screen">
      <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold my-8">Hello VanJS!</h1>
        <p class="mb-4">This is your homepage.</p>
        <Counter />
      </div>
    </div>,
  ];
};
