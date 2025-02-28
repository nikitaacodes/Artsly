import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // You can call your backend authentication logic here (e.g., API call)
    console.log("Email:", email);
    console.log("Password:", password);

    // Reset form
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-purple-900">
        Sign In
      </h2>

      {/* Display error if any */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-2 bg-purple-900 text-white rounded"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-900 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
