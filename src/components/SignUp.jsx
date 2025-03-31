import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Progress } from "../pages/Progress";
const SignUp = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [userId, setUserId] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserId(userCredential.user.uid);
      setStep1(false);
      setStep2(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }
    setStep2(false);
    setStep3(true);
  };

  const handleAvatarSelection = async () => {
    if (!selectedAvatar) {
      setError("Please select an avatar.");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: `${name} (${username})`,
        photoURL: selectedAvatar,
      });

      const db = getDatabase();
      await set(ref(db, `users/${userId}`), {
        name,
        email,
        username,
        avatar: selectedAvatar,
      });

      navigate("/dashboard");
    } catch (error) {
      setError("Failed to save user data.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {step1 && (
        <>
          <h2 className="text-2xl font-bold text-center text-main">Sign Up</h2>
          <div>
            {" "}
            <Progress step={step1 ? 1 : step2 ? 2 : step3 ? 3 : 1} />{" "}
          </div>
          <form onSubmit={handleSignUp} className="mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-main"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-main"
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-main"
              placeholder="Confirm Password"
              required
            />
            <button
              type="submit"
              className="w-3/12 my-5 bg-main text-white rounded "
            >
              Next
              {/* //icon here */}
            </button>
          </form>
        </>
      )}

      {step2 && (
        <>
          <h2 className="text-2xl font-bold text-center text-main">
            Choose a Username
            <Progress step={step1 ? 1 : step2 ? 2 : step3 ? 3 : 1} />
          </h2>
          <form onSubmit={handleUsernameSubmit} className="mt-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Username"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-main text-white rounded mt-4"
            >
              Next
            </button>
          </form>
        </>
      )}

      {step3 && (
        <>
          <h2 className="text-2xl font-bold text-center text-main">
            Choose an Avatar
            <Progress step={step1 ? 1 : step2 ? 2 : step3 ? 3 : 1} />
          </h2>
          <div className="flex justify-center space-x-2 mt-4">
            {["Aiden", "Luna", "Sky", "Nova", "Zane"].map((seed) => {
              const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
              return (
                <img
                  key={seed}
                  src={avatarUrl}
                  alt={seed}
                  className={`w-16 h-16 rounded-full cursor-pointer ${
                    selectedAvatar === avatarUrl ? "border-4 border-main" : ""
                  }`}
                  onClick={() => setSelectedAvatar(avatarUrl)}
                />
              );
            })}
          </div>
          <button
            onClick={handleAvatarSelection}
            className="w-full p-2 bg-main text-white rounded mt-4"
          >
            Finish
          </button>
        </>
      )}

      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="text-main font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
