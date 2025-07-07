import React, { useState } from "react";
import { useAuth } from "context";
import { signUpFormValidation } from "utils";
import { GoogleSignInButton, PrimaryButton } from "components";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const { signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormErrors({});

    const { valid, errors } = signUpFormValidation(
      email,
      password,
      passwordConfirm
    );

    if (!valid) {
      setFormErrors(errors);
      return;
    }

    try {
      await signup(email, password);
      // optionally redirect or show success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <div className="flex justify-center items-start pt-48 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="p-6 h-max w-full max-w-[428px] flex flex-col gap-4 justify-between border"
        >
          <div>
            <h2 className="font-medium text-2xl mb-8">Sign Up</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {formErrors.passwordConfirm && (
            <p className="text-red-500 text-sm">{formErrors.passwordConfirm}</p>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col gap-4 mt-4">
            <PrimaryButton text="create account" type="submit" />

            <div className="flex justify-center items-center gap-4">
              <hr className="w-full" />
              <span className="text-center text-sm text-gray-500">or</span>
              <hr className="w-full" />
            </div>

            <GoogleSignInButton />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
