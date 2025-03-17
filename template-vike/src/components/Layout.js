import van from "vanjs-core";
import { setPageContext } from "../renderer/usePageContext";

/**
 * @param {import("../types/types.ts").LayoutProps} param0
 * @returns
 */
export function Layout({ Page, pageContext }) {
  const { main } = van.tags;
  setPageContext(pageContext);
  return main({ id: "main" }, Page());
}
