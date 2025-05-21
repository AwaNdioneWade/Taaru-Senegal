import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ClientRoutes from "./client";
import { LoadingSpinner } from "../shared/components/LoadingSpinner";

// Lazy loading des routes
const TailorRoutes = lazy(() => import("./tailor"));
const AdminRoutes = lazy(() => import("./admin"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes client (chargées immédiatement) */}
      <Route path="/*" element={<ClientRoutes />} />

      {/* Routes tailleur (chargées à la demande) */}
      <Route
        path="/tailor/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <TailorRoutes />
          </Suspense>
        }
      />

      {/* Routes admin (chargées à la demande) */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoutes />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
