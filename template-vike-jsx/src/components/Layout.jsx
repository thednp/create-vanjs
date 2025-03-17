import { setPageContext } from "../renderer/usePageContext";

export function Layout({ Page, pageContext }) {
  setPageContext(pageContext);

  return (
    <main id="main">
      <Page />
    </main>
  );
}
