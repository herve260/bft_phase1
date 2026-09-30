import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/tourism-logo.png";

const links = [
  ["Home", "/"],
  ["Destinations", "/destinations"],
  ["Internships", "/internships"],
  ["Training", "/training"],
  ["Feedback", "/feedback"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Build Future Tourism" className="h-14 w-14 object-contain" />
          <div className="hidden sm:block">
            <p className="text-lg font-extrabold leading-tight text-slate-900">BUILD FUTURE</p>
            <p className="text-xs font-bold tracking-[0.3em] text-green-700">TOURISM</p>
          </div>
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-50 hover:text-green-700"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/internships" className="ml-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-green-800">Find Opportunity</Link>
          {user ? <><Link to={user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "/admin" : "/dashboard"} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">{user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "Admin" : "Dashboard"}</Link><button type="button" onClick={logout} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">Logout</button></> : <Link to="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">Login</Link>}
        </nav>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-slate-100 px-3 py-3 font-semibold text-slate-700"
            >
              {label}
              <ChevronDown size={16} className="-rotate-90" />
            </NavLink>
          ))}
          {user ? <><Link onClick={() => setOpen(false)} to={user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "/admin" : "/dashboard"} className="mt-3 flex px-3 py-3 font-bold text-green-700">Dashboard</Link><button onClick={() => { logout(); setOpen(false); }} className="flex w-full px-3 py-3 font-bold text-slate-700">Logout</button></> : <Link onClick={() => setOpen(false)} to="/login" className="mt-3 flex px-3 py-3 font-bold text-green-700">Login</Link>}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
