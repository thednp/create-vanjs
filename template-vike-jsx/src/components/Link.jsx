import van from "vanjs-core";
import { usePageContext } from "../renderer/usePageContext";

export { Link };

const Link = ({ href, children, ...props } = {}) => {
  const { urlPathname } = usePageContext();
  const hrefAtt = () => href?.val ? href.val : href;
  const ariaCurrent = van.derive(() => {
    return hrefAtt() === urlPathname ? "page" : undefined;
  });
  return (
    <a href={hrefAtt} aria-current={ariaCurrent} {...props}>
      {children}
    </a>
  );
};
