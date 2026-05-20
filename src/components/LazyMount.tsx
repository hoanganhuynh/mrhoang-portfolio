"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function LazyMount({
  id,
  children,
  minHeight = "520px",
}: {
  id?: string;
  children: ReactNode;
  minHeight?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    const node = ref.current;
    if (!node) return;

    const onSectionRequest = (event: Event) => {
      const requestedId = (event as CustomEvent<string>).detail;
      if (requestedId === id) {
        setMounted(true);
      }
    };

    window.addEventListener("lazy-section-request", onSectionRequest);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "520px 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.removeEventListener("lazy-section-request", onSectionRequest);
    };
  }, [id, mounted]);

  return (
    <div id={id} ref={ref} style={!mounted ? { minHeight } : undefined}>
      {mounted ? children : null}
    </div>
  );
}
