"use client";

import { useEffect, useRef } from "react";

interface GivebutterWidgetProps {
  id: string;
  className?: string;
}

export default function GivebutterWidget({ id, className }: GivebutterWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the custom element
    const widget = document.createElement("givebutter-widget");
    widget.setAttribute("id", id);
    containerRef.current.appendChild(widget);

    // Load the Givebutter script only once globally
    if (!scriptLoaded.current && !document.querySelector('script[src="https://givebutter.com/js/widget.js"]')) {
      scriptLoaded.current = true;
      const script = document.createElement("script");
      script.src = "https://givebutter.com/js/widget.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (typeof (window as any).Givebutter !== "undefined") {
      // If script already loaded, re-init
      try { (window as any).Givebutter("init"); } catch {}
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [id]);

  return <div ref={containerRef} className={className} />;
}
