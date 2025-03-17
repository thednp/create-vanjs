import { usePageContext } from "../renderer/usePageContext";

export { Link };

const Link = ({ href, children, ...rest } = {}) => {
  const props = Object.fromEntries(
    Object.entries(rest).filter(([_, val]) => val !== undefined),
  );

  const { urlPathname } = usePageContext();
  const hrefAtt = () => href?.val ? href.val : href;
  const isActive = hrefAtt() === "/"
    ? urlPathname === hrefAtt()
    : urlPathname?.startsWith(hrefAtt()) || false;

  return (
    <a href={hrefAtt()} aria-current={isActive ? "page" : undefined} {...props}>
      {children}
    </a>
  );
};
