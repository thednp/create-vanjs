import type { MetaType, PageContext } from "../types/types";

export function getPageMeta(pageContext: PageContext, meta: MetaType): string {
  // console.log("getPageTitle", pageContext)
  const str =
    // Title defined dynamically by data()
    pageContext.data?.[meta as keyof PageContext["data"]] ||
    // Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js)
    // The setting 'pageContext.config.title' is a custom setting we defined at ./+config.ts
    pageContext.config[meta] ||
    "Unknown meta";

  return str as keyof PageContext["data"];
}
