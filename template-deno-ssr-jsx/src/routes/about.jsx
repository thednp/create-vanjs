import { Meta, Title } from "@vanjs/meta";
import { A, navigate } from "@vanjs/router";

export const route = {
  preload: async (params) => {
    // in most cases you may want to enforce user access control
    console.log("About preload triggered", params);
  },
  load: async (params) => {
    // Load data if needed
    // you might want to cache this data
    console.log("About load triggered", params);
  },
};

export const Page = () => {
  Title("About Page");
  Meta({ name: "description", content: "About description" });

  return [
    <div class="flex h-screen">
      <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold my-8">About</h1>
        <p class="mb-4">This is the about page</p>
        <button type="button" class="btn mr-2" onClick={() => navigate("/")}>
          Go home
        </button>
        <A href="/not-found" class="btn">Not found</A>
      </div>
    </div>,
  ];
};
