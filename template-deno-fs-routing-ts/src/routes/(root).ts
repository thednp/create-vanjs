import { type ChildDom } from "vanjs-core";
import Nav from "../components/nav.ts";

type LayoutProps = {
  children: ChildDom[];
};

const Layout = ({ children }: LayoutProps) => {
  return [
    Nav(),
    ...children,
  ];
};

export default Layout;
