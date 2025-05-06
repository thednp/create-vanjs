import van from "vanjs-core";
import { Link } from "../components/Link";

export const Layout = ({ children } /* pageContext */) => {
  const open = van.state(false);
  const onOpenChange = () => {
    const current = open.val;
    open.val = !current;
  };

  return (
    <main id="main">
      <div class="flex p-4 gap-2 md:hidden items-center">
        <label
          aria-label="Open menu"
          for="drawer"
          class="btn btn-ghost drawer-button"
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            >
            </path>
          </svg>
          <span class="font-bold">Admin Navigation</span>
        </label>
      </div>
      <div class="drawer mx-auto md:drawer-open">
        <input
          id="drawer"
          type="checkbox"
          class="drawer-toggle"
          onChange={onOpenChange}
        />
        <div class="drawer-content px-4" inert={open}>
          {children}
        </div>
        <div
          class="drawer-side z-40"
          style="scroll-behavior: smooth; scroll-padding-top: 5rem;"
        >
          <label for="drawer" class="drawer-overlay" aria-label="Close Menu">
          </label>
          <aside class="bg-base-200 min-h-screen w-80">
            <div class="navbar sticky top-0 z-20 pb-0 pt-4 px-4 backdrop-blur-md font-bold">
              Admin navigation
            </div>
            <ul class="menu w-full z-10">
              <li>
                <Link
                  href="/admin"
                  class="aria-[current=page]:bg-primary aria-[current=page]:text-primary-content"
                >
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/articles"
                  class="aria-[current=page]:bg-primary aria-[current=page]:text-primary-content"
                >
                  <span>Articles</span>
                </Link>
                <Link
                  href="/admin/categories"
                  class="aria-[current=page]:bg-primary aria-[current=page]:text-primary-content"
                >
                  <span>Categories</span>
                </Link>
                <Link
                  href="/admin/users"
                  class="aria-[current=page]:bg-primary aria-[current=page]:text-primary-content"
                >
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
};
