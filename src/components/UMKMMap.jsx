import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { renderToStaticMarkup } from "react-dom/server";
import UMKMCard from "./UMKMCard";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const svgIcons = {
  Makanan: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M1.338 1.961C1.495 1.362 2.041 1 2.615 1c.354 0 .676.133.921.35a1.5 1.5 0 0 1 1.928 0A1.38 1.38 0 0 1 6.385 1c.574 0 1.12.362 1.277.961C7.812 2.533 8 3.455 8 4.5a3.5 3.5 0 0 1-1.595 2.936c-.271.177-.405.405-.405.6v.396q0 .034.004.066c.034.248.157 1.169.272 2.124c.113.937.224 1.959.224 2.378a2 2 0 1 1-4 0c0-.42.111-1.44.224-2.378c.115-.955.238-1.876.272-2.124L3 8.432v-.396c0-.195-.134-.423-.405-.6A3.5 3.5 0 0 1 1 4.5c0-1.045.188-1.967.338-2.539M6 5a.5.5 0 0 1-1 0V2.5a.5.5 0 0 0-1 0V5a.5.5 0 0 1-1 0V2.385A.385.385 0 0 0 2.615 2c-.166 0-.28.099-.31.215A9.2 9.2 0 0 0 2 4.5a2.5 2.5 0 0 0 1.14 2.098c.439.285.86.786.86 1.438v.396q0 .1-.013.2c-.034.246-.156 1.161-.27 2.11c-.116.965-.217 1.914-.217 2.258a1 1 0 1 0 2 0c0-.344-.1-1.293-.217-2.259c-.114-.948-.236-1.863-.27-2.11A2 2 0 0 1 5 8.433v-.396c0-.652.421-1.153.86-1.438A2.5 2.5 0 0 0 7 4.5c0-.932-.168-1.764-.305-2.285C6.665 2.1 6.55 2 6.385 2A.385.385 0 0 0 6 2.385zm3 .5A4.5 4.5 0 0 1 13.5 1a.5.5 0 0 1 .5.5v5.973l.019.177a261 261 0 0 1 .229 2.24c.123 1.256.252 2.664.252 3.11a2 2 0 1 1-4 0c0-.446.129-1.854.252-3.11c.063-.637.126-1.247.173-1.699l.02-.191H10a1 1 0 0 1-1-1zm2.997 2.053l-.021.202a386 386 0 0 0-.228 2.233c-.127 1.287-.248 2.63-.248 3.012a1 1 0 1 0 2 0c0-.383-.121-1.725-.248-3.012a315 315 0 0 0-.228-2.233l-.021-.201L13 7.5V2.035A3.5 3.5 0 0 0 10 5.5V7h1.5a.5.5 0 0 1 .497.553"/></svg>
  `,
  Minuman: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15.72 2.22a.75.75 0 0 1 1.061 1.06L15.56 4.5h2.19c.318 0 .6.2.707.498l1.25 3.5A.75.75 0 0 1 19 9.5h-1.045l-1.587 10.05c-.21 1.465-1.46 2.45-2.97 2.45h-2.796c-1.511 0-2.761-.985-2.969-2.44L6.045 9.5H5.001a.75.75 0 0 1-.707-1.002l1.25-3.5a.75.75 0 0 1 .707-.498h7.188zm.717 7.28H7.563l1.555 9.837c.099.695.692 1.163 1.484 1.163H13.4c.792 0 1.385-.468 1.486-1.174zm.785-3.5H6.78l-.714 2h11.871z"/></svg>
  `,
  Jasa: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256 "><path fill="currentColor" d="M226.76 69a8 8 0 0 0-12.84-2.88l-40.3 37.19l-17.23-3.7l-3.7-17.23l37.19-40.3A8 8 0 0 0 187 29.24A72 72 0 0 0 88 96a72.3 72.3 0 0 0 6 28.94L33.79 177c-.15.12-.29.26-.43.39a32 32 0 0 0 45.26 45.26c.13-.13.27-.28.39-.42L131.06 162A72 72 0 0 0 232 96a71.6 71.6 0 0 0-5.24-27M160 152a56.14 56.14 0 0 1-27.07-7a8 8 0 0 0-9.92 1.77l-55.9 64.74a16 16 0 0 1-22.62-22.62L109.18 133a8 8 0 0 0 1.77-9.93a56 56 0 0 1 58.36-82.31l-31.2 33.81a8 8 0 0 0-1.94 7.1l5.66 26.33a8 8 0 0 0 6.14 6.14l26.35 5.66a8 8 0 0 0 7.1-1.94l33.81-31.2A56.06 56.06 0 0 1 160 152"/></svg>
  `,
  Barang: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M12 22v-9m3.17-10.79a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.66 1.66 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"/><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.64 1.64 0 0 0 1.63 0z"/></g></svg>
  `,
  Lainnya: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m4.5 1.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m6 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"/></svg>
  `,
};

const categoryColors = {
  Makanan: "#ef4444",
  Minuman: "#3b82f6",
  Jasa: "#a855f7",
  Barang: "#22c55e",
  Lainnya: "#64748b",
};

const MapBounds = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
    }
  }, [points, map]);
  return null;
};

const MapFix = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 200);
  }, [map]);
  return null;
};

const createPinIcon = (category) => {
  const color = categoryColors[category] || "#64748b";
  const svg = svgIcons[category] || svgIcons["Lainnya"];

  const html = renderToStaticMarkup(
    <div style={{ position: "relative", width: "32px", height: "42px" }}>
      <svg width="32" height="42" viewBox="0 0 44 58">
        <path
          d="M22 0C9.8 0 0 9.8 0 22c0 16.2 22 36 22 36s22-19.8 22-36C44 9.8 34.2 0 22 0z"
          fill={color}
          stroke="#fff"
          strokeWidth="3"
        />
        <circle cx="22" cy="22" r="17" fill="#fff" />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "4px",
          left: 0,
          width: "100%",
          height: "26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );

  return L.divIcon({
    html,
    className: "custom-pin-icon",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
};

const UMKMMap = () => {
  const [umkms, setUmkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markerPoints, setMarkerPoints] = useState([]);

  const extractCoords = (url) => {
    if (!url) return null;
    const match = url.match(/q=([-\d.]+),([-\d.]+)/);
    return match
      ? { lat: parseFloat(match[1]), lng: parseFloat(match[2]) }
      : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/umkm");
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        const points = [];
        data.forEach((u) => {
          const coords = extractCoords(u.location?.embed_url);
          if (coords) points.push([coords.lat, coords.lng]);
        });
        setMarkerPoints(points);
        setUmkms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center text-lg font-semibold text-gray-600">
        Memuat peta UMKM...
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
      <MapContainer
        center={[-6.8057, 110.8406]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <MapFix />
        {markerPoints.length > 0 && <MapBounds points={markerPoints} />}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {umkms.map((u) => {
          const coords = extractCoords(u.location?.embed_url);
          if (!coords) return null;
          const category = u.category?.name || u.listing?.category || "Lainnya";

          return (
            <Marker
              key={u.id}
              position={[coords.lat, coords.lng]}
              icon={createPinIcon(category)}
            >
              <Popup maxWidth={280} closeButton={false}>
                <div className="p-2">
                  <Link to={`/detail-umkm/${u.slug}`}>
                    <UMKMCard data={u} />
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default UMKMMap;
