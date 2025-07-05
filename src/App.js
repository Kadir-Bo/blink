import { PrivateRoute } from "components";
import { AuthContextProvider } from "context";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "utils";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={
            route.public ? (
              <route.component />
            ) : (
              <PrivateRoute>
                <route.component />
              </PrivateRoute>
            )
          }
        />
      ))}
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
