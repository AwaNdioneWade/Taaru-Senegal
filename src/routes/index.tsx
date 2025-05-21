import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import PublicLayout from "../layouts/PublicLayout";
import ArtisanProfile from "../pages/Artisan/ArtisanProfile";
import EvenementsPage from "../pages/Evenements/Evenements";
import Galeries from "../pages/Galeries/Galeries";
import Apropos from "../pages/Apropos/Apropos";
import Contact from "../pages/Contact/Contact";
import Services from "../pages/Services/Services";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Connexion />} />
      <Route path="/register" element={<Inscription />} />
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/artisan/:id" element={<ArtisanProfile />} />
        <Route path="/evenements" element={<EvenementsPage />} />
        <Route path="/galeries" element={<Galeries />} />
        <Route path="/a-propos" element={<Apropos />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/formations" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
