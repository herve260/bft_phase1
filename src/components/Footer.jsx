import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-xl font-black text-white">Build Future Tourism</h3>
          <p className="mt-3 text-sm leading-6">Explore Rwanda, learn practical skills and connect with opportunities.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Explore</h4>
          <div className="mt-4 grid gap-2 text-sm">
            <Link to="/destinations" className="hover:text-white">Destinations</Link>
            <Link to="/internships" className="hover:text-white">Internships</Link>
            <Link to="/training" className="hover:text-white">Training</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white">Company</h4>
          <div className="mt-4 grid gap-2 text-sm">
            <Link to="/about" className="hover:text-white">About Us</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/contact#faq" className="hover:text-white">FAQ</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white">Contact</h4>
          <p className="mt-4 text-sm leading-7">Kigali, Rwanda<br />info@buildfuturetourism.rw<br />+250 788 000 000</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Build Future Tourism. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
