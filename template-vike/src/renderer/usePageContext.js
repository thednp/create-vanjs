import van from "vanjs-core";

export const CurrentPageContext = van.state({});

export const usePageContext = () => {
  return CurrentPageContext.val;
};

export const setPageContext = (newContextVal) => {
  CurrentPageContext.val = newContextVal;
};
