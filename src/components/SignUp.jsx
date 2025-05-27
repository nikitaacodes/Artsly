import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || !confirmPassword || !name) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create initial user document in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      setStep1(false);
      setStep2(true);
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim()) {
      setError("Username cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      // Check if username is already taken
      const usernameDoc = await getDoc(
        doc(db, "Usernames", username.toLowerCase())
      );
      if (usernameDoc.exists()) {
        setError("This username is already taken. Please choose another one.");
        setLoading(false);
        return;
      }

      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user found. Please try signing up again.");
      }

      // Update user document with username
      await setDoc(
        doc(db, "Users", currentUser.uid),
        {
          username: username.toLowerCase(),
        },
        { merge: true }
      );

      // Reserve username
      await setDoc(doc(db, "Usernames", username.toLowerCase()), {
        uid: currentUser.uid,
        createdAt: new Date().toISOString(),
      });

      setStep2(false);
      setStep3(true);
    } catch (error) {
      console.error("Username error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelection = async () => {
    if (!selectedAvatar) {
      setError("Please select an avatar.");
      return;
    }

    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user found. Please try signing up again.");
      }

      // Update Firebase Auth profile
      await updateProfile(currentUser, {
        displayName: `${name} (${username})`,
        photoURL: selectedAvatar,
      });

      // Update user document with avatar
      await setDoc(
        doc(db, "Users", currentUser.uid),
        {
          avatar: selectedAvatar,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Avatar selection error:", error);
      setError("Failed to save user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {step1 && (
        <>
          <h2 className="text-2xl font-bold text-center text-main">Sign Up</h2>
          <Progress step={1} />
          <form onSubmit={handleSignUp} className="mt-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-main"
              placeholder="Full Name"
              required
            />
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
              className="w-3/12 my-5 bg-main text-white rounded"
            >
              Next
            </button>
          </form>
        </>
      )}

      {step2 && (
        <>
          <h2 className="text-2xl font-bold text-center text-main">
            Choose a Username
          </h2>
          <Progress step={2} />
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
          </h2>
          <Progress step={3} />
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
