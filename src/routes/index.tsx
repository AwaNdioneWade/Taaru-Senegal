import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import PublicLayout from "../layouts/PublicLayout";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Connexion />} />
        <Route path="/register" element={<Inscription />} />
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/tailleurs" element={<NotFound />} />
        <Route path="/clients" element={<NotFound />} />
        <Route path="/tissus" element={<NotFound />} />
        <Route path="/accessoires" element={<NotFound />} />
        <Route path="/galerie" element={<NotFound />} />
        <Route path="/formations" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
