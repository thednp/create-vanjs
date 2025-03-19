import van from "vanjs-core";

const isClient = () => typeof window !== "undefined";

/** @typedef {string | number | boolean | Record<string, unknown>} StateValues */

/**
 * @param {string} key
 * @return {string | object | null}
 */
const getStoredValue = (key) => {
  if (!isClient()) return;
  const raw = localStorage.getItem(key) || "";
  if (raw.length) return JSON.parse(raw);
  else return null;
};

/** @param {string} key */
const removeStoredValue = (key) => {
  if (!isClient()) return;
  localStorage.removeItem(key);
};

/**
 * @param {string} key
 * @param {StateValues} newValue
 */
const setStoredValue = (key, newValue) => {
  if (!isClient()) return;
  localStorage.setItem(key, JSON.stringify(newValue));
};

/**
 * @param {string} key
 * @param {StateValues} defaultValue
 * @returns {State<typeof defaultValue>}
 */
export const persistentState = (key, defaultValue) => {
  const initialValue = getStoredValue(key) || defaultValue;
  const stateValue = van.state(initialValue);

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
