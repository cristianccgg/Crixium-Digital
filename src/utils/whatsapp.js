import { getUTMParams } from "../hooks/useUTM";
import { trackEvent } from "./analytics";

export const WHATSAPP_NUMBER = "573219746045";

export const buildWhatsAppUrl = (message) => {
  const utmParams = getUTMParams();
  let finalMessage = message;

  if (utmParams.utm_source) {
    finalMessage += ` [Ref: ${utmParams.utm_source}${utmParams.utm_campaign ? `/${utmParams.utm_campaign}` : ""}]`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
};

export const trackWhatsAppClick = (component, service = "") => {
  trackEvent("whatsapp_click", {
    component,
    service,
  });
};
