import { Home, NotFound, SignIn, SignUp } from "pages";
import ForgotPassword from "pages/auth/ForgotPassword";

const routes = [
  {
    name: "home",
    id: "home",
    path: "/",
    component: Home,
    exact: true,
    public: true,
  },
  {
    name: "forgot password",
    id: "forgot-password",
    path: "/help/forgot-password",
    component: ForgotPassword,
    exact: true,
    public: true,
  },
  {
    name: "page not found",
    id: "not-found",
    path: "/*",
    component: NotFound,
    public: true,
  },
  {
    name: "sign in",
    id: "sign-in",
    path: "/sign-in",
    component: SignIn,
    public: true,
  },
  {
    name: "sign up",
    id: "sign-up",
    path: "/sign-up",
    component: SignUp,
    public: true,
  },
];
export default routes;
