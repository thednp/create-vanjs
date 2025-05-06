import Counter from "../../components/Counter";

export const Page = () => {
  return (
    <div class="flex h-screen">
      <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold my-8">Hello VanJS!</h1>
        <p class="mb-4">This is your homepage.</p>
        <Counter />
      </div>
    </div>
  );
};
