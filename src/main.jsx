import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
//pages
import Home from "./pages/Home";
import Collaboration from "./pages/Collaboration";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

//styles
import "./index.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
// Define routes here
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/collaboration",
    element: <Collaboration />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Wrap the entire app with Redux Provider */}
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
