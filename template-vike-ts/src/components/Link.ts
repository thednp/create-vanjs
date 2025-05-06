import van from "vanjs-core";
import type { ChildDom, Props, PropsWithKnownKeys, State } from "vanjs-core";
import { usePageContext } from "../renderer/usePageContext";

export { Link };

type LinkProps = Props & PropsWithKnownKeys<HTMLAnchorElement>;

function Link(props: LinkProps, ...children: ChildDom[]) {
  const { a } = van.tags;
  const { href, ...rest } = props;
  const { urlPathname } = usePageContext();
  const hrefAtt = () =>
    (href as State<string>)?.val ? (href as State<string>).val : href as string;

  const ariaCurrent = van.derive(() => {
    return urlPathname === hrefAtt() ? "page" : "";
  });

  return a({
    href: hrefAtt,
    "aria-current": ariaCurrent,
    ...rest,
  }, ...children);
}
