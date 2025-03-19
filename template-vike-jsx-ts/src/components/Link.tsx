import type { State } from "vanjs-core";

import { usePageContext } from "../renderer/usePageContext";

export { Link };

const Link: JSX.Component<"a"> = ({ href, children, ...props } = {}) => {
  const { urlPathname } = usePageContext();
  const hrefAtt = () =>
    (href as State<string>)?.val ? (href as State<string>).val : href as string;
  const isActive = hrefAtt() === "/"
    ? urlPathname === hrefAtt()
    : urlPathname?.startsWith(hrefAtt()) || false;

  return (
    <a href={hrefAtt} aria-current={isActive ? "page" : undefined} {...props}>
      {children}
    </a>
  );
};
