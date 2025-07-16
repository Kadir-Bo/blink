import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  reauthenticateWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const signup = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserDocument(user);
    return user;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    await createUserDocument(user);
    return user;
  };

  const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async ({ displayName }) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName });
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    if (!auth.currentUser) throw new Error("No user is logged in");

    const user = auth.currentUser;

    // Re-authenticate user
    try {
      if (user.providerData.some((p) => p.providerId === "google.com")) {
        // Google sign-in reauthentication with popup
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      } else {
        // Email/password reauthentication
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
      }

      // Update password
      await updatePassword(user, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const values = {
    currentUser,
    loading,
    logout,
    signup,
    loginWithGoogle,
    loginWithEmailAndPassword,
    resetPassword,
    updateUserProfile,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
