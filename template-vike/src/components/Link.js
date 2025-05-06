import van from "vanjs-core";
import { usePageContext } from "../renderer/usePageContext.js";

export { Link };

/**
 * @param {import("../types/types.ts").LinkProps} props
 * @param {...import('vanjs-core').ChildDom} children
 */
function Link(props, ...children) {
  const { a } = van.tags;
  const { urlPathname } = usePageContext();
  const { href, ...rest } = props;
  const ariaCurrent = van.derive(() => {
    const HREF = href?.val ? href.val : href;
    return HREF === urlPathname ? "page" : "";
  });

  return a({
    href,
    "aria-current": ariaCurrent,
    ...rest,
  }, ...children);
}
