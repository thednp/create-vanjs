import type { PageComponent } from "./types";

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      Page: PageComponent;
      data?: {
        // Needed by getPageTitle() and onBeforePrerenderStart()
        title?: string;
        description?: string;
      };
      config: {
        /** Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js) */
        title?: string;
        description?: string;
      };
      abortReason?: string;
      someAsyncProps?: number;
    }
  }
}

// Tell TypeScript that this file isn't an ambient module
export {};
