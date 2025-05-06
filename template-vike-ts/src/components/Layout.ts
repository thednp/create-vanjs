import van from "vanjs-core";
import type { LayoutProps } from "../types/types";

export function Layout({ Page /*, pageContext*/ }: LayoutProps) {
  const { main } = van.tags;
  return main({
    id: "main",
  }, Page());
}
