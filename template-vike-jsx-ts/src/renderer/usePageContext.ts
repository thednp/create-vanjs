import van from "vanjs-core";
import type { PageContext } from "../types/types";

export const CurrentPageContext = van.state<Partial<PageContext>>({});

export const usePageContext = () => {
  return CurrentPageContext.val;
};

export const setPageContext = <T extends PageContext>(newContextVal: T) => {
  CurrentPageContext.val = newContextVal;
};
