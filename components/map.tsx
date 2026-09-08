"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";

// Leaflet's default marker icons reference image files via relative URLs
// that don't resolve correctly under Next.js bundling. Rebuild the default
// icon from CDN URLs so pins render without needing to copy assets into
// /public.
const pin = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export type MapPoint = {
  id: string;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  region?: string | null;
};

export default function DestinationsMap({
  points,
  center,
  zoom,
  linkToDetail = true,
  className = "h-80 w-full",
}: {
  points: MapPoint[];
  center?: [number, number];
  zoom?: number;
  linkToDetail?: boolean;
  className?: string;
}) {
  const valid = points.filter(
    (p) => typeof p.lat === "number" && typeof p.lng === "number"
  );

  if (valid.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center rounded border border-forest/10 bg-sand text-sm text-ink/60`}>
        No coordinates available yet.
      </div>
    );
  }

  const mapCenter: [number, number] =
    center ?? [valid[0].lat, valid[0].lng];
  const mapZoom = zoom ?? (valid.length > 1 ? 9 : 12);

  return (
    <div className={`${className} overflow-hidden rounded border border-forest/10`}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {valid.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={pin}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-forest">{p.name}</p>
                {p.region && <p className="text-ink/60">{p.region}</p>}
                {linkToDetail && (
                  <Link
                    href={`/destinations/${p.slug}`}
                    className="mt-1 inline-block text-river underline"
                  >
                    View destination
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
