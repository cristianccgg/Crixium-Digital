import { getUTMParams } from "../hooks/useUTM";

const hasAnalyticsConsent = () => {
  try {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) return false;
    const settings = JSON.parse(consent);
    return settings.statistics === true;
  } catch {
    return false;
  }
};

const pushToDataLayer = (eventName, params = {}) => {
  if (!hasAnalyticsConsent()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
};

const logToFirebase = async (eventName, params = {}) => {
  if (!hasAnalyticsConsent()) return;

  try {
    const { analytics } = await import("../components/firebase");
    if (analytics) {
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, eventName, params);
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
};

export const trackEvent = (eventName, params = {}) => {
  const utmParams = getUTMParams();
  const enrichedParams = {
    ...params,
    ...utmParams,
    page_path: window.location.pathname,
    page_language: document.documentElement.lang || "es",
  };

  pushToDataLayer(eventName, enrichedParams);
  logToFirebase(eventName, enrichedParams);
};

export const trackPageView = (path, title) => {
  trackEvent("page_view", {
    page_path: path,
    page_title: title || document.title,
  });
};
