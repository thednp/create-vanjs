import van from "vanjs-core";

/**
 * @param {import("../types/types.ts").LayoutProps} param0
 */
export function Layout({ Page /*, pageContext*/ }) {
  const { main } = van.tags;
  return main({ id: "main" }, Page());
}
