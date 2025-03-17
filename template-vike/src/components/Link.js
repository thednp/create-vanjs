import van from "vanjs-core";
import { usePageContext } from "../renderer/usePageContext";

export { Link };

/**
 * @param {import("../types/types.ts").LinkProps} props
 * @param {...import('vanjs-core').ChildDom} children
 */
function Link(props, ...children) {
  const { a } = van.tags;
  const { href, ...rest } = props;
  const { urlPathname } = usePageContext();
  const HREF = href?.val ? href.val : href;
  const isActive = href === "/"
    ? urlPathname === href
    : urlPathname?.startsWith(HREF) || false;

  return a({
    href,
    "aria-current": isActive ? "page" : "",
    ...rest,
  }, ...children);
}
