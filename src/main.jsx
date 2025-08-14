import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
//pages
import Home from "./pages/Home";

//components
import Settings from "./components/Settings";
import Collaborations from "./components/Collaborations";
import Explore from "./components/Explore";
//styles
import "./index.css";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
// Define routes here
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/collaboration",
    element: <Collaborations />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
