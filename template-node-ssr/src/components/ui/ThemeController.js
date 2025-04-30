import van from "vanjs-core";
import { Moon, Sun, SunMoon } from "vanjs-lucide";
import { persistentState } from "../../util/persistentState";

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
const systemTheme = persistentState<Theme>("ui-theme", getSystemTheme());

export const ThemeController = (
  { theme, ...rest },
  ...children
) => {
  const props = Object.fromEntries(
    Object.entries(rest).filter(([_, val]) => val !== undefined),
  );
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
      globalThis?.matchMedia("(prefers-color-scheme: dark)").addEventListener(
        "change",
        themeCallback,
      );
    } else {
      globalThis?.matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener(
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

export const ThemeToggle = (
  initialProps,
) => {
  const { input, label, span, button } = van.tags;
  const props = Object.fromEntries(
    Object.entries(initialProps).filter(([_, val]) => val !== undefined),
  );
  const themes = ["light", "dark", "system"];
  const themeIndex = van.state(themes.indexOf(systemTheme.val));
  // the internal theme state
  const theme = van.state<Theme>(themes[themeIndex.val]);
  const icon = van.derive(() => {
    const currentTheme = theme.val;
    if (currentTheme === "dark") {
      return { icon: Moon({ class: "h-6 w-6" }) };
    } else if (currentTheme === "light") {
      return { icon: Sun({ class: "h-6 w-6" }) };
    }
    return { icon: SunMoon({ class: "h-6 w-6" }) };
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
      icon.val.icon,
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

export const ThemeDropdown = (props) => {
  const { input, div, ul, li, button } = van.tags;
  const themes = ["light", "dark", "system"];
  const themeIndex = van.state(themes.indexOf(systemTheme.val));
  // the internal theme state
  const theme = van.state<Theme>(themes[themeIndex.val]);
  const icon = van.derive(() => {
    const currentTheme = theme.val;
    if (currentTheme === "dark") {
      return Moon({ class: "h-6 w-6 mr-2" });
    } else if (currentTheme === "light") {
      return Sun({ class: "h-6 w-6 mr-2" });
    }
    return SunMoon({ class: "h-6 w-6 mr-2" });
  });

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
