import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * SEOHead: Lightweight client-side SEO manager
 * Updates document.title, meta tags, canonical link, and JSON-LD schema per route
 * to guarantee optimal indexing and crawling by Googlebot, Bingbot, and social crawlers.
 */
export const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://maharshaevents.com/images/luxury-mandap-stage.webp",
  ogType = "website",
  schemaJson,
}: SEOHeadProps) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to set or create a meta tag
    const setMetaTag = (attributeName: "name" | "property", attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    setMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMetaTag("name", "geo.region", "IN-TG;IN-AP");
    setMetaTag("name", "geo.placename", "Hyderabad, Telangana, India");
    setMetaTag("name", "geo.position", "17.3616;78.3756");
    setMetaTag("name", "ICBM", "17.3616, 78.3756");

    // 3. Open Graph Tags
    const canonicalUrl = canonical || window.location.href.split("?")[0];
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", "Maharsha Events Hyderabad");

    // 4. Twitter Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 5. Canonical Link
    let canonicalTag = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonicalUrl);

    // 6. Dynamic JSON-LD Schema
    const schemaScriptId = "dynamic-route-schema";
    let scriptTag = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (schemaJson) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = schemaScriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaJson);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, canonical, ogImage, ogType, schemaJson]);

  return null;
};

export default SEOHead;
