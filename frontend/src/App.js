import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Residences from "@/pages/Residences";
import About from "@/pages/About";
import Regions from "@/pages/Regions";
import Contact from "@/pages/Contact";
import Donation from "@/pages/Donation";
import DonationResult from "@/pages/DonationResult";
import Admin from "@/pages/Admin";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/residences" element={<Residences />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/don" element={<Donation />} />
            <Route path="/don/merci" element={<DonationResult />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
