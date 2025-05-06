import Nav from "./Nav";

const Layout = ({ children }) => {
  return [
    Nav(),
    ...children,
  ];
};

export default Layout;
