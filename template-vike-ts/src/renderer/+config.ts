import type { Config } from "vike/types";

export const config = {
  passToClient: ["data", "title", "description"],
  clientRouting: true,
  hydrationCanBeAborted: true,
  meta: {
    title: {
      env: { server: true, client: true },
    },
    description: {
      env: { server: true, client: true },
    },
    dataIsomorph: {
      env: { config: true },
      effect({ configDefinedAt, configValue }) {
        if (typeof configValue !== "boolean") {
          throw new Error(`${configDefinedAt} should be a boolean`);
        }
        if (configValue) {
          return {
            meta: {
              data: {
                env: { server: true, client: true },
              },
            },
          };
        }
      },
    },
  },
  hooksTimeout: {
    data: {
      error: 30 * 1000,
      warning: 10 * 1000,
    },
  },
} satisfies Config;

declare global {
  namespace Vike {
    interface Config {
      title?: string;
      description?: string;
    }
  }
}
