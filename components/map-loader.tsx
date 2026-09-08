"use client";

// next/dynamic with `ssr: false` can't be called directly inside a Server
// Component. This thin client wrapper does the dynamic import so the
// (server) destinations pages can just render <DestinationsMap .../> as
// normal JSX without knowing about the SSR restriction.
import dynamic from "next/dynamic";
import type { MapPoint } from "./map";

const DestinationsMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 w-full items-center justify-center rounded border border-forest/10 bg-sand text-sm text-ink/60">
      Loading map…
    </div>
  ),
});

export default function DestinationsMapLoader(props: {
  points: MapPoint[];
  center?: [number, number];
  zoom?: number;
  linkToDetail?: boolean;
  className?: string;
}) {
  return <DestinationsMap {...props} />;
}
