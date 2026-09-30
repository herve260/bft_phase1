import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle.js";

function NotFound() {
  usePageTitle("Page Not Found");
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-20">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-green-700">404</p>
        <h1 className="mt-3 text-5xl font-black text-slate-900">Page not found</h1>
        <p className="mx-auto mt-4 max-w-lg text-slate-600">The page you requested does not exist or may have moved.</p>
        <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800">
          <Home size={18} /> Back home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
