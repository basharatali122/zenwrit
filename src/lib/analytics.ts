/**
 * Analytics guard for ZenWrit.
 *
 * Admin routes should never send pageview events to analytics providers.
 * This module exposes a tiny exclusion helper and an inline script that
 * sets a global flag as early as possible (before any analytics snippet
 * initializes) so any future analytics integration can short-circuit.
 */

export const analyticsExclusionScript = `(function(){
  try {
    window.__analyticsExcluded__ = window.location.pathname.startsWith('/admin');
  } catch (e) {}
})();`;

export function isAnalyticsExcluded(path?: string): boolean {
  if (typeof window === "undefined") return false;
  const pathname = path ?? window.location.pathname;
  return pathname.startsWith("/admin");
}

/**
 * Wrapper for sending a pageview event. Returns true when the event was
 * allowed to fire; returns false (and does NOT call the tracker) on
 * excluded routes such as /admin and /admin/*.
 */
export function trackPageview(
  send: (pathname: string) => void,
  path?: string,
): boolean {
  const pathname = path ?? (typeof window !== "undefined" ? window.location.pathname : "");
  if (isAnalyticsExcluded(pathname)) return false;
  send(pathname);
  return true;
}
