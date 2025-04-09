import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routesConfig } from "./routes.config";

const AppRoute = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        {routesConfig.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
