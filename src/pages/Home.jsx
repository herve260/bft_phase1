import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { featuredDestinations } from "../utils/content.js";
import { ArrowRight, BriefcaseBusiness, GraduationCap, MapPin, Quote, Search, ShieldCheck, Users, Globe2, Award, Mail } from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=85";


const stats = [["30+", "Destinations"], ["50+", "Opportunities"], ["15+", "Training Programs"], ["1,000+", "Learners & Travelers"]];

function Home() {
  usePageTitle("Home");
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-green-950/20" />
        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">🇷🇼 Discover Rwanda. Build Your Future.</span>
            <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl">Explore Rwanda.<br /><span className="text-lime-300">Learn. Grow. Connect.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">Build Future Tourism connects travelers, students and professionals with Rwanda's destinations, internships and practical career-development opportunities.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/destinations" className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3.5 font-bold text-slate-950 hover:bg-lime-300">Explore Rwanda <ArrowRight size={18} /></Link>
              <Link to="/internships" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-900 hover:bg-slate-100"><BriefcaseBusiness size={18} /> Find Internship</Link>
              <Link to="/training" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-bold backdrop-blur hover:bg-white/20"><GraduationCap size={18} /> Professional Training</Link>
            </div>
          </div>
          <div className="hidden lg:flex lg:justify-end">
            <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-md">
              <Globe2 className="text-lime-300" size={42} />
              <h2 className="mt-5 text-2xl font-bold">One platform, many possibilities.</h2>
              <p className="mt-3 leading-7 text-slate-200">Find places to visit, discover career opportunities and build practical skills for Rwanda's growing tourism sector.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-4"><MapPin size={18} className="mb-2 text-lime-300" />Explore</div>
                <div className="rounded-2xl bg-white/10 p-4"><Award size={18} className="mb-2 text-lime-300" />Learn</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map(([value, label]) => <div key={label} className="text-center"><p className="text-3xl font-black text-green-700">{value}</p><p className="mt-1 text-sm font-semibold text-slate-500">{label}</p></div>)}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-bold uppercase tracking-widest text-green-700">Featured destinations</p><h2 className="mt-2 text-4xl font-black text-slate-900">Places you should discover</h2></div><Link to="/destinations" className="font-bold text-green-700">View all destinations →</Link></div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredDestinations.map((item) => <article key={item.name} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"><img src={item.image} alt={item.name} className="h-56 w-full object-cover" /><div className="p-6"><p className="text-sm font-semibold text-green-700">{item.location}</p><h3 className="mt-1 text-xl font-bold text-slate-900">{item.name}</h3><p className="mt-3 leading-7 text-slate-600">{item.text}</p><Link to="/destinations" className="mt-5 inline-flex items-center gap-2 font-bold text-slate-900">Explore <ArrowRight size={17} /></Link></div></article>)}
          </div>
        </div>
      </section>

      <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="font-bold uppercase tracking-widest text-green-700">Why Build Future Tourism?</p><h2 className="mt-2 text-4xl font-black text-slate-900">Tourism and career development in one place.</h2><p className="mt-5 leading-8 text-slate-600">We bring exploration, learning and professional opportunity together so young people and visitors can make more informed plans for their next experience.</p></div><div className="grid gap-5 sm:grid-cols-2">{[[ShieldCheck,"Trusted information","Clear destination, training and opportunity information."],[Users,"People first","Connect learners, mentors, employers and travelers."],[GraduationCap,"Practical learning","Training programs designed around useful skills."],[Globe2,"Rwanda focused","A platform built around Rwanda's tourism ecosystem."]].map(([Icon,title,text]) => <div key={title} className="rounded-3xl border border-slate-200 p-6"><Icon className="text-green-700" /><h3 className="mt-4 font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div></div></section>

      <section className="bg-green-950 py-20 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-bold uppercase tracking-widest text-lime-300">Latest opportunities</p><h2 className="mt-2 text-4xl font-black">Internships & training</h2></div><Link to="/internships" className="font-bold text-lime-300">See opportunities →</Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{["Tourism Front Office Intern","Digital Marketing for Tourism","Hospitality Customer Care"].map((title, i) => <div key={title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10"><p className="text-sm font-semibold text-lime-300">{i === 0 ? "Internship" : "Professional Training"}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-200">Practical experience, mentorship and career-ready skills for the tourism sector.</p><Link to={i === 0 ? "/internships" : "/training"} className="mt-6 inline-block font-bold text-white">Learn more →</Link></div>)}</div></div></section>

      <section className="py-20"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="text-center"><p className="font-bold uppercase tracking-widest text-green-700">Testimonials</p><h2 className="mt-2 text-4xl font-black text-slate-900">What people say</h2></div><div className="mt-10 grid gap-6 md:grid-cols-2"><blockquote className="rounded-3xl bg-slate-50 p-8"><Quote className="text-green-700" /><p className="mt-5 text-lg leading-8 text-slate-700">“The platform makes it easier to connect tourism interests with practical learning and career opportunities.”</p><footer className="mt-5 font-bold text-slate-900">— Tourism learner</footer></blockquote><blockquote className="rounded-3xl bg-lime-50 p-8"><Quote className="text-green-700" /><p className="mt-5 text-lg leading-8 text-slate-700">“I can discover destinations and also find training opportunities without using separate platforms.”</p><footer className="mt-5 font-bold text-slate-900">— Young professional</footer></blockquote></div></div></section>

      <section className="bg-slate-900 py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><Mail className="mx-auto text-lime-300" size={36} /><h2 className="mt-4 text-3xl font-black">Stay connected</h2><p className="mx-auto mt-3 max-w-2xl text-slate-300">Get destination ideas, new internships and professional training updates in your inbox.</p><form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}><input type="email" required placeholder="Your email address" className="flex-1 rounded-full px-5 py-3.5 text-slate-900 outline-none" /><button className="rounded-full bg-lime-400 px-7 py-3.5 font-bold text-slate-950 hover:bg-lime-300">Subscribe</button></form></div></section>

    </main>
  );
}

export default Home;
