import { Meta, Title } from "@vanjs/meta";

export default () => {
  Title("VanJS + Vite Homepage");
  Meta({ name: "description", content: "Home description" });

  return [
    <div class="flex h-screen">
      <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold my-8">Hello VanJS!</h1>
        <p class="my-8">This is your homepage.</p>
      </div>
    </div>,
  ];
};
