export type {
  ChangeEvent,
  LayoutProps,
  LinkProps,
  MetaType,
  PageContext,
  PageContextCLIENT,
  PageContextSERVER,
  ThemeControllerProps,
};

import type { PageContextClient, PageContextServer } from "vike/types";
import type {
  ChildDom,
  Props,
  PropsWithKnownKeys,
  PropValueOrDerived,
  State,
} from "vanjs-core";
import { Element as VanElement } from "mini-van-plate/van-plate";

export type PageComponent = (
  pageProps?: Partial<PageProps>,
) => HTMLElement | VanElement;

export type PageProps = {
  // define any Page Props here
};

type PageContextCustom = {
  Page: PageComponent;
  pageProps?: PageProps;
  title?: string;
  description?: string;
  // add more meta tags here
};

type PageContextCLIENT = PageContextClient & PageContextCustom;
type PageContextSERVER = PageContextServer & PageContextCustom;
type PageContext = PageContextCLIENT | PageContextSERVER;
type LayoutProps = { Page: PageComponent; pageContext: PageContext };

type ChangeEvent<T extends EventTarget & Element = HTMLInputElement> =
  & InputEvent
  & { target: T };

type Theme = "dark" | "light" | "system";
type ThemeControllerProps =
  & { theme: State<Theme> }
  & Record<string, PropValueOrDerived>
  & PropsWithKnownKeys<HTMLFormElement>;

type LinkProps = Props & PropsWithKnownKeys<HTMLAnchorElement> & {
  onclick?: (e: Event) => void;
  "data-active"?: boolean;
  href: string;
};

type MetaType = keyof PageContext["config"] | keyof PageContext["data"];
