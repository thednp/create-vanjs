import { getPageMeta } from "./getPageMeta";

export const applyMeta = (pageContext) => {
  const title = getPageMeta(pageContext, "title");
  const description = getPageMeta(pageContext, "description");
  const tags = ["og:title", "description", "og:description"];

  document.title = title;
  tags.forEach((tagName) => {
    const tag = document.head.querySelector(`meta[name="${tagName}"]`);
    tag?.setAttribute(
      "content",
      tagName.endsWith("title") ? title : description,
    );
  });
};
