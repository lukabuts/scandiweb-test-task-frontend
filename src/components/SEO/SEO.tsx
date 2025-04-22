import { useEffect } from "react";
import logo from "@/assets/images/logo.png";

type SEOProps = {
  title?: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
};

const SEO = ({
  title,
  description,
  keywords = "tech, e-commerce, product, online store",
  image = logo,
  url = window.location.href,
  type = "website",
}: SEOProps) => {
  useEffect(() => {
    document.title = title
      ? `${title} | Scandiweb Test Task`
      : "Scandiweb Test Task";

    const updateOrCreateMeta = (
      nameOrProperty: string,
      content: string,
      isProperty = false
    ) => {
      const attr = isProperty ? "property" : "name";
      let element = document.head.querySelector(
        `meta[${attr}="${nameOrProperty}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, nameOrProperty);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    updateOrCreateMeta("description", description);
    updateOrCreateMeta("keywords", keywords);
    updateOrCreateMeta("viewport", "width=device-width, initial-scale=1");

    // Open Graph
    updateOrCreateMeta("og:title", title || "Scandiweb Test Task", true);
    updateOrCreateMeta("og:description", description, true);
    updateOrCreateMeta("og:type", type, true);
    updateOrCreateMeta("og:url", url, true);
    updateOrCreateMeta("og:image", image, true);

    // Twitter
    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", title || "Scandiweb Test Task");
    updateOrCreateMeta("twitter:description", description);
    updateOrCreateMeta("twitter:image", image);

    // Canonical
    let canonicalLink = document.head.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", url);
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;
