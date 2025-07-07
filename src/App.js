import { PrivateRoute } from "components";
import { AuthContextProvider, LayoutContextProvider } from "context";
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
              <LayoutContextProvider>
                <route.component />
              </LayoutContextProvider>
            ) : (
              <PrivateRoute>
                <LayoutContextProvider>
                  <route.component />
                </LayoutContextProvider>
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
