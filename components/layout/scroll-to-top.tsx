"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { usePathname } from "@/i18n/navigation";

/**
 * A client-side navigation keeps the visitor's scroll position until the new
 * page is committed, so a fresh page can open at its footer and then ride back
 * to the top. By then every scroll reveal above the fold has been marked as
 * seen, so the entry animations never play. Resetting before the page paints
 * fixes both: the page starts at the top and the reveals run.
 *
 * Back and forward are left alone — Next restores those positions itself.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const markHistoryNavigation = () => {
      isHistoryNavigation.current = true;
    };

    window.addEventListener("popstate", markHistoryNavigation);

    return () =>
      window.removeEventListener("popstate", markHistoryNavigation);
  }, []);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }

    // An in-page link target keeps its own position.
    if (window.location.hash) return;

    const root = document.documentElement;
    const previousBehaviour = root.style.scrollBehavior;

    // The stylesheet opts into smooth scrolling so in-page links glide. A
    // route change has to be instant, otherwise the reset animates up the new
    // page in front of the visitor.
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    const frame = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehaviour;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
