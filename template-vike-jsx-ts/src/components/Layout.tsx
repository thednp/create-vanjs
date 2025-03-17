import type { LayoutProps } from "../types/types";
import { setPageContext } from "../renderer/usePageContext";

export function Layout({ Page, pageContext }: LayoutProps) {
  setPageContext(pageContext);

  return (
    <main id="main">
      <Page />
    </main>
  );
}
