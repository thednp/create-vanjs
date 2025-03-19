import van from "vanjs-core";

const isClient = () => typeof window !== "undefined";

type StateValues = string | number | boolean | Record<string, unknown>;

const getStoredValue = (key: string) => {
  if (!isClient()) return;
  try {
    const raw = localStorage.getItem(key) || "";
    if (raw.length) return JSON.parse(raw);
  } catch (_e) {
    return null;
  }
};

const removeStoredValue = (key: string) => {
  if (!isClient()) return;
  localStorage.removeItem(key);
};

const setStoredValue = (key: string, newValue: StateValues) => {
  if (!isClient()) return;
  localStorage.setItem(key, JSON.stringify(newValue));
};

export const persistentState = <T extends StateValues>(
  key: string,
  defaultValue: T,
) => {
  const initialValue = getStoredValue(key) || defaultValue;
  const stateValue = van.state<T>(initialValue);

  van.derive(() => {
    const newValue = stateValue.val;
    setTimeout(() => {
      if (typeof newValue !== "undefined") {
        setStoredValue(key, newValue);
      } else {
        removeStoredValue(key);
      }
    });
  });
  return stateValue;
};
