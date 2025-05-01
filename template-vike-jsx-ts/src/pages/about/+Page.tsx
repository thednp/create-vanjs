import { Link } from "../../components/Link";

export function Page() {
  return (
    <div class="flex h-screen">
      <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold my-8">About</h1>
        <p class="mb-4">This is the about page</p>
        <Link class="btn" href="/not-found">Not found</Link>
      </div>
    </div>
  );
}
