import van, { type State } from "vanjs-core";
import { usePageContext } from "../renderer/usePageContext";

export { Link };

const Link: JSX.Component<"a"> = ({ href, children, ...props } = {}) => {
  const { urlPathname } = usePageContext();
  const hrefAtt = () =>
    (href as State<string>)?.val ? (href as State<string>).val : href as string;
  const ariaCurrent = van.derive(() => {
    return hrefAtt() === urlPathname ? "page" : undefined;
  });
  return (
    <a href={hrefAtt} aria-current={ariaCurrent} {...props}>
      {children}
    </a>
  );
};
