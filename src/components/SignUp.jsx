import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser, setError, setLoading } from "../redux/slices/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [localError, setLocalError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalLoading(true);
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        "http://localhost:7777/signup",
        {
          emailId,
          password,
          name,
          userName,
        },
        {
          withCredentials: true, // cookie with token set here
        }
      );

      const userId = response.data.userId;
      dispatch(setUser({ userId }));

      navigate("/"); // redirect to homepage or dashboard
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {localError && (
          <p className="text-red-500 text-center mb-4 text-sm font-medium">
            {localError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={localLoading}
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-200 rounded-lg font-semibold"
          >
            {localLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={goToLogin}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
