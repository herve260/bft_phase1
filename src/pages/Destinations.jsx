import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, ArrowRight } from "lucide-react";

import DestinationMap from "../components/DestinationMap.jsx";
import { destinations } from "../utils/destinations.js";
import { usePageTitle } from "../hooks/usePageTitle.js";

function Destinations() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  usePageTitle("Destinations");

  const categories = ["All", ...new Set(destinations.map((p) => p.category))];
  const filtered = useMemo(
    () =>
      destinations.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          `${p.name} ${p.location} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );

  return (
    <main>
      <section className="bg-green-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-bold uppercase tracking-widest text-lime-300">Places to visit in Rwanda</p>
          <h1 className="mt-3 text-5xl font-black">Discover the Land of a Thousand Hills</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Explore nature, culture, history, lakes, cities and adventure destinations across Rwanda.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 rounded-3xl bg-slate-50 p-4 md:grid-cols-[1fr_auto]">
            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
              <Search size={20} className="text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full bg-transparent outline-none"
              />
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border-0 bg-white px-5 py-3 font-semibold text-slate-700 ring-1 ring-slate-200 outline-none"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mt-10">
            <DestinationMap destinations={filtered} />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    {item.category}
                  </span>
                  <h2 className="mt-3 text-xl font-bold text-slate-900">{item.name}</h2>
                  <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-slate-500">
                    <MapPin size={15} /> {item.location}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.shortDescription}</p>
                  <Link to={`/destinations/${item.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold text-green-700">
                    View details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-slate-500">No destinations match your search.</div>
          )}

          <div className="mt-16 rounded-3xl bg-lime-50 p-8">
            <h2 className="text-2xl font-black text-slate-900">More destinations coming soon</h2>
            <p className="mt-2 text-slate-600">
              The administrator can add more Rwanda destinations as the platform grows.
            </p>
            <Link to="/contact" className="mt-5 inline-block font-bold text-green-700">
              Suggest a destination →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Destinations;
