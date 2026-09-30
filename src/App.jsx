import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Destinations from "./pages/Destinations.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import Internships from "./pages/Internships.jsx";
import Training from "./pages/Training.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Feedback from "./pages/Feedback.jsx";

function App() {
  return <AuthProvider><BrowserRouter><Routes><Route element={<PublicLayout />}><Route path="/" element={<Home />} /><Route path="/destinations" element={<Destinations />} /><Route path="/destinations/:slug" element={<DestinationDetails />} /><Route path="/internships" element={<Internships />} /><Route path="/training" element={<Training />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/feedback" element={<Feedback />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<Dashboard />} /></Route><Route element={<ProtectedRoute roles={["ADMIN", "SUPER_ADMIN"]} />}><Route path="/admin" element={<AdminDashboard />} /></Route><Route path="*" element={<NotFound />} /></Route></Routes></BrowserRouter></AuthProvider>;
}
export default App;
