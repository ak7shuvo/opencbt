"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Fails silently — the app works fully without the service worker,
        // it only loses static-asset caching / installability.
      });
    }
  }, []);

  return null;
}
