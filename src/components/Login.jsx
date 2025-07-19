import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:7777/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // enable sending cookies if needed
        body: JSON.stringify({
          emailId,
          password,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const result = await res.json();

      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err) {
      console.error("login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Log In
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 text-sm font-medium">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-200 rounded-lg font-semibold"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={goToSignUp}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
