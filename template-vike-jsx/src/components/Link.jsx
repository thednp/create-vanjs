import { usePageContext } from "../renderer/usePageContext";

export { Link };

const Link = ({ href, children, ...props } = {}) => {
  const { urlPathname } = usePageContext();
  const hrefAtt = () => href?.val ? href.val : href;
  const isActive = hrefAtt() === "/"
    ? urlPathname === hrefAtt()
    : urlPathname?.startsWith(hrefAtt()) || false;

  return (
    <a href={hrefAtt} aria-current={isActive ? "page" : undefined} {...props}>
      {children}
    </a>
  );
};
