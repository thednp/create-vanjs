export function getPageMeta(pageContext, meta) {
  // console.log("getPageTitle", pageContext)
  const str =
    // Title defined dynamically by data()
    pageContext.data?.[meta] ||
    // Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js)
    // The setting 'pageContext.config.title' is a custom setting we defined at ./+config.ts
    pageContext.config[meta] ||
    "Unknown meta";

  return str;
}
