import { Link } from "../../components/Link";
import { usePageContext } from "../../renderer/usePageContext";

export function Page() {
  const pageContext = usePageContext();
  const { is404 } = pageContext;
  const pageTitle = () =>
    is404
      ? (
        <>
          <span class="font-bold">404</span>
          {" / "}
          Page Not Found
        </>
      )
      : "Unknown Error";

  return (
    <div class="flex h-screen">
      <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold my-8">
          {pageTitle()}
        </h1>
        <p class="mb-4">This is a sample error page</p>
        <Link class="btn" href="/">Go Back Home</Link>
      </div>
    </div>
  );
}
