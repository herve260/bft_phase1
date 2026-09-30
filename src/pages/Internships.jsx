import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Search, Upload, CheckCircle2, Clock3 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { internshipOpportunities } from "../utils/content.js";

function Internships() {
  usePageTitle("Internships");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [statusId, setStatusId] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api.get("/internships").then(({ data }) => setJobs(data.data)).catch(() => setJobs([]));
  }, []);

  const opportunities = jobs.length ? jobs.map((j) => ({
    ...j,
    type: "Internship",
    company: j.companyName,
    id: j.id,
    duration: j.duration || "Flexible",
    registrationFee: j.registrationFee || j.registration_fee || 0,
    description: j.description
  })) : internshipOpportunities;

  const filtered = useMemo(() => opportunities.filter((j) =>
    (type === "All" || j.type === type) && `${j.title} ${j.company} ${j.location}`.toLowerCase().includes(query.toLowerCase())
  ), [opportunities, query, type]);

  const apply = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login", { state: { from: "/internships" } }); return; }
    setBusy(true); setError("");
    const form = new FormData(e.currentTarget);
    try {
      const { data } = await api.post(`/internships/${selected.id}/apply`, form);
      setSubmitted(true);
      setStatusId(String(data.data.id));
    } catch (err) {
      setError(err.response?.data?.message || "Application failed");
    } finally { setBusy(false); }
  };

  const track = async () => {
    if (!user) { navigate("/login"); return; }
    try {
      const { data } = await api.get("/applications/me");
      const item = data.data.find((a) => String(a.id) === statusId);
      setStatus(item ? `Application ${item.id}: ${item.status}` : "Application not found in your account.");
    } catch (err) { setStatus(err.response?.data?.message || "Unable to check application status."); }
  };

  return <main><section className="bg-green-950 py-20 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="font-bold uppercase tracking-widest text-lime-300">Internships & professional opportunities</p><h1 className="mt-3 text-5xl font-black">Build experience that opens doors.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">Search opportunities, apply online and track your application status.</p></div></section><section className="py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-3 rounded-3xl bg-slate-50 p-4 md:grid-cols-[1fr_180px]"><label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200"><Search size={20} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs, skills or companies..." className="w-full outline-none" /></label><select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl bg-white px-4 py-3 font-semibold ring-1 ring-slate-200"><option>All</option><option>Internship</option><option>Training</option></select></div><div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]"><div className="space-y-4">{filtered.map((job) => <article key={job.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap justify-between gap-4"><div><span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{job.type}</span><h2 className="mt-3 text-xl font-bold text-slate-900">{job.title}</h2><p className="mt-1 text-sm font-semibold text-slate-500">{job.company} · {job.location} · {job.duration}</p></div><BriefcaseBusiness className="text-green-700" /></div><p className="mt-4 text-sm leading-6 text-slate-600">{job.description}</p><button onClick={() => { setSelected(job); setSubmitted(false); setError(""); }} className="mt-5 rounded-full bg-green-700 px-5 py-2.5 text-sm font-bold text-white">View & Apply</button></article>)}{filtered.length === 0 && <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">No current opportunities match your search.</p>}</div><aside className="h-fit rounded-3xl bg-slate-50 p-6"><Clock3 className="text-green-700" /><h2 className="mt-4 text-xl font-black">Track application</h2><p className="mt-2 text-sm leading-6 text-slate-600">Sign in and enter the application ID you received after submitting.</p><input value={statusId} onChange={(e) => setStatusId(e.target.value)} placeholder="Application ID" className="mt-4 w-full rounded-xl border-0 bg-white px-4 py-3 ring-1 ring-slate-200" /><button onClick={track} className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white">Check status</button>{status && <p className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800">{status}</p>}</aside></div></div></section>{selected && <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/60 p-4"><div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 sm:p-8"><div className="flex justify-between gap-4"><div><p className="text-sm font-bold text-green-700">Application</p><h2 className="mt-1 text-2xl font-black">{selected.title}</h2></div><button onClick={() => setSelected(null)} className="text-slate-400">✕</button></div>{submitted ? <div className="py-12 text-center"><CheckCircle2 className="mx-auto text-green-600" size={52} /><h3 className="mt-4 text-2xl font-black">Application submitted</h3><p className="mt-2 text-slate-600">Your application ID is <strong>{statusId}</strong>.</p></div> : <form onSubmit={apply} className="mt-7 grid gap-4"><input name="fullName" required defaultValue={user?.name || ""} placeholder="Full name" className="rounded-xl border border-slate-200 px-4 py-3" /><input name="email" required type="email" defaultValue={user?.email || ""} placeholder="Email address" className="rounded-xl border border-slate-200 px-4 py-3" /><input name="phone" placeholder="Phone number" className="rounded-xl border border-slate-200 px-4 py-3" /><input name="school" placeholder="School / institution" className="rounded-xl border border-slate-200 px-4 py-3" /><input name="course" placeholder="Course" className="rounded-xl border border-slate-200 px-4 py-3" /><input name="level" placeholder="Level" className="rounded-xl border border-slate-200 px-4 py-3" /><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 p-4"><Upload size={20} className="text-green-700" /><span className="text-sm font-semibold text-slate-600">Upload CV (PDF/DOCX, max 5MB)<input name="cv" required type="file" accept=".pdf,.doc,.docx" className="mt-2 block text-xs" /></span></label>{Number(selected.registrationFee || 0) > 0 && <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900"><strong>Paid internship:</strong> registration fee RWF {Number(selected.registrationFee).toLocaleString()} is the initial payment to the company offering this internship. Payment is manually verified.<select name="paymentMethod" required className="mt-3 w-full rounded-xl border border-amber-200 bg-white px-4 py-3"><option value="MOMO">Mobile Money</option><option value="BANK">Bank transfer</option><option value="CASH">Cash</option></select><input name="transactionReference" required placeholder="Transaction/reference number" className="mt-3 w-full rounded-xl border border-amber-200 px-4 py-3" /></div>}<textarea name="coverLetter" required placeholder="Why are you interested?" rows="4" className="rounded-xl border border-slate-200 px-4 py-3" />{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="rounded-xl bg-green-700 px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Submitting..." : "Submit Application"}</button></form>}</div></div>}</main>;
}
export default Internships;
