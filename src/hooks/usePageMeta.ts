import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
}

const setMeta = (selector: string, content: string) => {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
};

/** Sets the document title and SEO description for the current page. */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
  }, [title, description]);
}
