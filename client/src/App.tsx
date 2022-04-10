import { ErrorBoundary, GraphqlProviderRoute } from "@/components";
import { AuthGuardRoute } from "@/components/AuthGuardRoute";
import { DashboardPage, LoginPage, UsersPage } from "@/pages";
import { Auth0Provider } from "@auth0/auth0-react";
import { Suspense } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Routes>
              <Route path="/" element={<AuthGuardRoute />}>
                <Route element={<GraphqlProviderRoute />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </Suspense>
      </ErrorBoundary>
    </Auth0Provider>
  );
};

export default App;
