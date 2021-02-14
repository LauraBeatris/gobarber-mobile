import React from "react";

import { useAuth } from "~/contexts/auth/AuthContext";
import Loading from "~/components/Base/Loading";

import AppRouter from "./app.routes";
import AuthRouter from "./auth.routes";

const Router: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return user ? <AppRouter /> : <AuthRouter />;
};

export default Router;
