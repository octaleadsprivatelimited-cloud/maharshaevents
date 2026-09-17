// Utility to track conversions and clicks for Google Ads and Meta (Facebook/Instagram) Ads

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Extract and persist UTM and ad click tracking parameters
export const initAdTracking = () => {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const trackingKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
      "wbraid",
      "gbraid",
    ];

    trackingKeys.forEach((key) => {
      const value = params.get(key);
      if (value) {
        sessionStorage.setItem(`ad_${key}`, value);
      }
    });
  } catch (err) {
    console.warn("Failed to parse ad tracking params:", err);
  }
};

// Retrieve stored tracking attributes for lead attribution
export const getAdTrackingData = () => {
  if (typeof window === "undefined") return {};

  const data: Record<string, string> = {};
  const trackingKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "wbraid",
    "gbraid",
  ];

  trackingKeys.forEach((key) => {
    const stored = sessionStorage.getItem(`ad_${key}`);
    if (stored) {
      data[key] = stored;
    }
  });

  return data;
};

// Track Lead Form Submission for Google Ads & Meta Pixel
export const trackLeadConversion = (details: {
  source: string;
  eventType?: string;
  city?: string;
  budget?: string;
}) => {
  // Google Tag / Google Ads Event
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "Engagement",
      event_label: details.source,
      value: 1,
      currency: "INR",
      ...details,
      ...getAdTrackingData(),
    });
  }

  // Meta Pixel Event
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: details.eventType || "Event Planning Enquiry",
      content_category: details.source,
      currency: "INR",
      city: details.city,
    });
  }

  // Standard dataLayer push for GTM
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "generate_lead",
      leadDetails: details,
      adTracking: getAdTrackingData(),
    });
  }
};

// Track WhatsApp Click
export const trackWhatsAppClick = (source: string = "floating_button") => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "contact", {
      event_category: "Social",
      event_label: `WhatsApp - ${source}`,
      method: "WhatsApp",
    });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "WhatsAppClick", {
      source,
    });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "whatsapp_click",
      source,
    });
  }
};

// Track Phone Call Click
export const trackPhoneCall = (source: string = "header") => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "contact", {
      event_category: "Call",
      event_label: `Phone Call - ${source}`,
      method: "Phone",
    });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "PhoneCallClick", {
      source,
    });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "phone_call_click",
      source,
    });
  }
};
