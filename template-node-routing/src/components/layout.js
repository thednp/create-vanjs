import Nav from "./nav";

const Layout = ({ children }) => {
  return [
    Nav(),
    ...children,
  ];
};

export default Layout;
