import type { LayoutProps } from "../types/types";

export function Layout({ children /*pageContext*/ }: LayoutProps) {
  return (
    <main id="main">
      {children}
    </main>
  );
}
