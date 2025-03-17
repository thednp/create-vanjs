import van from "vanjs-core";
import { Moon, Sun, SunMoon } from "vanjs-lucide";
import { persistentState } from "../../util/persistentState";

/** @typedef {import("vanjs-core").ChildDom} ChildDom */
/** @typedef {import("../../types/types.ts").ThemeControllerProps} ThemeControllerProps */
/** @typedef {import("../../types/types.ts").ChangeEvent} ChangeEvent */

const isClient = () => typeof window !== "undefined";

const getSystemTheme = () => {
  if (isClient() && globalThis?.matchMedia) {
    return globalThis?.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  // return the default
  return "light";
};

// create a persisten state of the system theme
const systemTheme = persistentState("ui-theme", getSystemTheme());

/**
 * @param {ThemeControllerProps} initialProps
 * @param  {...[]} children
 */
export const ThemeController = (
  initialProps,
  ...children
) => {
  const { theme, ...props } = initialProps;
  if (!theme) {
    throw new Error(
      "ThemeController requires a theme property with valid value",
    );
  }
  const { form } = van.tags;
  const isConnected = van.state(false);

  // the controller form
  const controllerForm = form(
    props,
    ...children,
  );

  /**
   * @param {MediaQueryListEvent} event
   */
  const themeCallback = (event) => {
    const newTheme = event.matches ? "dark" : "light";
    if (systemTheme.val === "system") {
      theme.val = newTheme;
    }
  };

  van.derive(() => {
    if (!isClient()) return;
    document.documentElement.setAttribute("data-theme", systemTheme.val);
  });

  van.derive(() => {
    if (!isClient()) return;
    if (isConnected.val) {
      window?.matchMedia("(prefers-color-scheme: dark)").addEventListener(
        "change",
        themeCallback,
      );
    } else {
      window?.matchMedia("(prefers-color-scheme: dark)").removeEventListener(
        "change",
        themeCallback,
      );
    }
  });

  van.derive(() => {
    setTimeout(() => isConnected.val = controllerForm.isConnected);
  });

  return controllerForm;
};

/**
 * @param {Omit<ThemeControllerProps, "theme">} props
 */
export const ThemeToggle = (props) => {
  const { input, label, span, button } = van.tags;
  const themes = ["light", "dark", "system"];
  const themeIndex = van.state(themes.indexOf(systemTheme.val));
  // the internal theme state
  const theme = van.state(themes[themeIndex.val]);
  const icon = van.derive(() => {
    const currentTheme = theme.val;
    if (currentTheme === "dark") {
      return Moon({ class: "h-6 w-6" });
    } else if (currentTheme === "light") {
      return Sun({ class: "h-6 w-6" });
    }
    return SunMoon({ class: "h-6 w-6" });
  });

  return ThemeController(
    {
      ...props,
      theme,
    },
    button(
      {
        class: "btn btn-ghost btn-square",
        type: "button",
        onclick: () => {
          const oldVal = themeIndex.oldVal;
          const newIdx = oldVal < 2 ? themeIndex.oldVal + 1 : 0;
          themeIndex.val = newIdx;
          theme.val = themes[newIdx];
          systemTheme.val = themes[newIdx];
        },
      },
      icon,
      span({ class: "sr-only" }, "Toggle Theme"),
    ),
    label(
      { class: "sr-only", for: "theme-buttons" },
      "Toggle Theme",
      input({
        type: "radio",
        name: "theme-buttons",
        class: "theme-controller",
        "aria-label": "Light",
        checked: () => systemTheme.val === "light",
        value: "light",
      }),
      input({
        type: "radio",
        name: "theme-buttons",
        class: "theme-controller",
        "aria-label": "Dard",
        checked: () => systemTheme.val === "dark",
        value: "dark",
      }),
      input({
        type: "radio",
        name: "theme-buttons",
        class: "theme-controller",
        "aria-label": "System",
        checked: () => systemTheme.val === "system",
        value: "system",
      }),
    ),
  );
};

/**
 * @param {Omit<ThemeControllerProps, "theme">} props
 * @returns {typeof (Sun | SunMoon | Moon)}
 */
export const ThemeDropdown = (props) => {
  const { input, div, ul, li, button } = van.tags;
  const themes = ["light", "dark", "system"];
  const themeIndex = van.state(themes.indexOf(systemTheme.val));
  // the internal theme state
  const theme = van.state(themes[themeIndex.val]);
  const icon = van.derive(() => {
    const currentTheme = theme.val;
    if (currentTheme === "dark") {
      return Moon({ class: "h-6 w-6 mr-2" });
    } else if (currentTheme === "light") {
      return Sun({ class: "h-6 w-6 mr-2" });
    }
    return SunMoon({ class: "h-6 w-6 mr-2" });
  });

  /**
   * @param {ChangeEvent} e
   */
  const onSelect = (e) => {
    const value = e.target.value;
    theme.val = value;
    systemTheme.val = value;
  };

  return ThemeController(
    {
      ...props,
      theme,
    },
    div(
      { class: "dropdown dropdown-end" },
      button(
        { type: "button", class: "btn btn-ghost" },
        icon,
        "Theme",
      ),
      ul(
        {
          tabindex: "0",
          class:
            "dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl",
        },
        li(
          input({
            type: "radio",
            name: "theme-dropdown",
            onchange: onSelect,
            class:
              "theme-controller btn btn-sm btn-block btn-ghost justify-start",
            "aria-label": "Default",
            checked: () => systemTheme.val === "light",
            value: "light",
          }),
        ),
        li(
          input({
            type: "radio",
            name: "theme-dropdown",
            onchange: onSelect,
            class:
              "theme-controller btn btn-sm btn-block btn-ghost justify-start",
            "aria-label": "Dark",
            checked: () => systemTheme.val === "dark",
            value: "dark",
          }),
        ),
        li(
          input({
            type: "radio",
            name: "theme-dropdown",
            onchange: onSelect,
            class:
              "theme-controller btn btn-sm btn-block btn-ghost justify-start",
            "aria-label": "System",
            checked: () => systemTheme.val === "system",
            value: "system",
          }),
        ),
      ),
    ),
  );
};
