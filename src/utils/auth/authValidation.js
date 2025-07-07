const signUpFormValidation = (email, password, passwordConfirm) => {
  const errors = {};

  // Email validation
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email address.";
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  // Password confirmation
  if (!passwordConfirm) {
    errors.passwordConfirm = "Please confirm your password.";
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match.";
  }

  const valid = Object.keys(errors).length === 0;

  return { valid, errors };
};

export { signUpFormValidation };
