import van from "vanjs-core";
import type { Element as VanElement } from "mini-van-plate/van-plate";
import type { LayoutProps } from "../types/types";
import { setPageContext } from "../renderer/usePageContext";

export function Layout({ Page, pageContext }: LayoutProps) {
  const { main } = van.tags;
  setPageContext(pageContext);
  return main({
    id: "main",
  }, Page() as HTMLElement) as HTMLElement | VanElement;
}
