import van from "vanjs-core";
import { Moon, Sun, SunMoon } from "vanjs-lucide";
import { persistentState } from "../../util/persistentState";

const isClient = () => typeof window !== "undefined";

const mediaTarget = isClient() && globalThis
  ? globalThis.matchMedia("(prefers-color-scheme: dark)")
  : undefined;

const getSystemTheme = () => {
  if (isClient() && globalThis && "matchMedia" in globalThis) {
    return !mediaTarget?.matches ? "light" : "dark";
  }
  // return the default
  return "dark";
};

// create a persisten state of the system theme
const currentTheme = persistentState("ui-theme", "system");
const systemTheme = van.state(getSystemTheme());

export const ThemeController = (
  { ...rest },
  ...children
) => {
  const props = Object.fromEntries(
    Object.entries(rest).filter(([_, val]) => val !== undefined),
  );

  const { form } = van.tags;

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
    systemTheme.val = newTheme;
  };

  // Fix 1: resolve actual theme for data-theme attribute
  van.derive(() => {
    if (!isClient()) return;
    const resolved = currentTheme.val === "system"
      ? systemTheme.val
      : currentTheme.val;
    document.documentElement.setAttribute("data-theme", resolved);
  });

  van.derive(() => {
    if (!isClient()) return;
    mediaTarget?.addEventListener("change", themeCallback);
  });

  return controllerForm;
};

export const ThemeToggle = (
  initialProps,
) => {
  const { input, label, span, button } = van.tags;
  const props = Object.fromEntries(
    Object.entries(initialProps).filter(([_, val]) => val !== undefined),
  );
  const themes = ["light", "dark", "system"];

  return ThemeController(
    props,
    button(
      {
        class: "btn btn-ghost btn-square",
        type: "button",
        onclick: () => {
          const idx = themes.indexOf(currentTheme.val);
          currentTheme.val = themes[(idx + 1) % 3];
        },
      },
      () => {
        const theme = currentTheme.val;
        if (theme === "dark") {
          return Moon({ class: "h-6 w-6" });
        } else if (theme === "light") {
          return Sun({ class: "h-6 w-6" });
        }
        return SunMoon({ class: "h-6 w-6" });
      },
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
        checked: () => currentTheme.val === "light",
        value: "light",
      }),
      input({
        type: "radio",
        name: "theme-buttons",
        class: "theme-controller",
        "aria-label": "Dark",
        checked: () => currentTheme.val === "dark",
        value: "dark",
      }),
      input({
        type: "radio",
        name: "theme-buttons",
        class: "theme-controller",
        "aria-label": "System",
        checked: () => currentTheme.val === "system",
        value: "system",
      }),
    ),
  );
};

export const ThemeDropdown = (props) => {
  const { input, div, ul, li, button, span } = van.tags;
  const onSelect = (e) => {
    const value = e.target.value;
    currentTheme.val = value;
  };

  return ThemeController(
    props,
    div(
      { class: "dropdown dropdown-end" },
      button(
        {
          type: "button",
          class: "btn btn-ghost btn-square",
          ariaLabel: "Theme",
        },
        () => {
          const theme = currentTheme.val;
          if (theme === "dark") return Moon({ class: "h-6 w-6" });
          if (theme === "light") return Sun({ class: "h-6 w-6" });
          return SunMoon({ class: "h-6 w-6" });
        },
        span(
          { class: "sr-only" },
          "Theme",
        ),
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
            "aria-label": "Light",
            checked: () => currentTheme.val === "light",
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
            checked: () => currentTheme.val === "dark",
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
            checked: () => currentTheme.val === "system",
            value: "system",
          }),
        ),
      ),
    ),
  );
};
