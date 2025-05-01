import Nav from "../components/nav";

const Layout = ({ children }) => {
  return [
    Nav(),
    ...children,
  ];
};

export default Layout;
