import { A } from "@vanjs/router";
import { Meta, Title } from "@vanjs/meta";

export const Page = () => {
  Title("404 Error: Page Not found");
  Meta({ name: "description", content: "Page Not Found Description" });

  return (
    <div class="flex h-screen">
      <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold my-8">
          <span class="font-bold">404</span>
          {" / "}
          Page Not Found
        </h1>
        <p>This is a sample error page</p>
        <A class="btn" href="/">Go Back Home</A>
      </div>
    </div>
  )
};
