import { useEffect, useMemo } from "react";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];
const STORAGE_KEY = "utm_params";

export const getUTMParams = () => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const useUTM = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmData = {};
    let hasUTM = false;

    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        utmData[key] = value;
        hasUTM = true;
      }
    });

    if (hasUTM) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmData));
    }
  }, []);

  return useMemo(() => getUTMParams(), []);
};
