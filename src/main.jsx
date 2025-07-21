import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
//pages
import Home from "./pages/Home";
//styles
import "./index.css";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
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

  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
  
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
