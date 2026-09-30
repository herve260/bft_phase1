import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usePageTitle } from "../hooks/usePageTitle.js";

export default function Register() {
  usePageTitle("Register");
  const { register } = useAuth(); const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" }); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async (e) => { e.preventDefault(); setBusy(true); setError(""); try { await register(form); navigate("/dashboard"); } catch (err) { setError(err.response?.data?.message || "Registration failed"); } finally { setBusy(false); } };
  return <main className="min-h-[70vh] bg-slate-50 py-16"><div className="mx-auto max-w-md px-4"><div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"><p className="font-bold uppercase tracking-widest text-green-700">Join the platform</p><h1 className="mt-2 text-3xl font-black">Create your account</h1>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<form onSubmit={submit} className="mt-7 grid gap-4"><input required minLength="2" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-slate-200 px-4 py-3" /><input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-slate-200 px-4 py-3" /><input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-slate-200 px-4 py-3" /><input required minLength="8" type="password" placeholder="Password (8+ characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="rounded-xl border border-slate-200 px-4 py-3" /><button disabled={busy} className="rounded-xl bg-green-700 px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Creating..." : "Create account"}</button></form><p className="mt-5 text-center text-sm text-slate-600">Already have an account? <Link className="font-bold text-green-700" to="/login">Login</Link></p></div></div></main>;
}
