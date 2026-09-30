import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RWANDA_CENTER = [-1.94, 29.87];

function MapViewport({ destinations }) {
  const map = useMap();

  useEffect(() => {
    const points = destinations
      .filter((item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude))
      .map((item) => [item.latitude, item.longitude]);

    if (!points.length) {
      map.setView(RWANDA_CENTER, 8);
      return;
    }

    if (points.length === 1) {
      map.setView(points[0], 10);
      return;
    }

    map.fitBounds(points, { padding: [40, 40], maxZoom: 10 });
  }, [destinations, map]);

  return null;
}

function DestinationMap({ destinations }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">Interactive Rwanda map</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900">Explore destinations on the map</h2>
        </div>
        <p className="text-sm text-slate-500">{destinations.length} destination{destinations.length === 1 ? "" : "s"} shown</p>
      </div>

      <div className="bft-map">
        <MapContainer center={RWANDA_CENTER} zoom={8} scrollWheelZoom className="h-full w-full" aria-label="Interactive map of Rwanda tourism destinations">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewport destinations={destinations} />

          {destinations.map((item) => (
            <CircleMarker
              key={item.id}
              center={[item.latitude, item.longitude]}
              radius={8}
              pathOptions={{
                className: "bft-map-marker",
                fillColor: "#166534",
                color: "#ffffff",
                weight: 3,
                fillOpacity: 0.95,
              }}
            >
              <Popup>
                <div className="w-56">
                  <img src={item.image} alt="" className="h-28 w-full rounded-xl object-cover" />
                  <p className="mt-3 text-xs font-black uppercase tracking-wider text-green-700">{item.category}</p>
                  <h3 className="mt-1 text-base font-black text-slate-900">{item.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{item.location}</p>
                  <Link to={`/destinations/${item.slug}`} className="mt-3 inline-flex font-bold text-green-700">View destination →</Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default DestinationMap;
