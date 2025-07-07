import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, GoogleSignInButton, PrimaryButton } from "components";
import { useAuth } from "context";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginWithGoogle } = useAuth();
  const location = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      location("/");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignIn = async () => {
    setError("");

    try {
      await loginWithGoogle();
      location("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <div className="flex justify-center items-start pt-48 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="p-6 h-max w-full max-w-[428px] flex flex-col gap-8 justify-between border"
        >
          <div className="flex flex-col gap-3">
            <h2 className="font-medium text-2xl mb-8">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 mb-2 rounded"
              autoComplete="email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col gap-2 mt-4">
            <PrimaryButton
              text="sign in"
              type="submit"
              onClick={handleSubmit}
            />

            <div className="flex justify-center items-center gap-4">
              <hr className="w-full" />
              <span className="text-center text-sm text-gray-500">or</span>
              <hr className="w-full" />
            </div>

            <GoogleSignInButton onClick={handleGoogleSignIn} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
