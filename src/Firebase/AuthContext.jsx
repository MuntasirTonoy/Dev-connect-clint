import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.init";
import { saveUserIfNew } from "../Hoocks/Api";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createUser = async (email, password, name, imageUrl) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageUrl,
      });

      await saveUserIfNew({
        email,
        name,
        photoURL: imageUrl,
      });

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      await saveUserIfNew({
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
      });

      return result;
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name = "", photo = "") => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authContextValue = {
    user,
    loading,
    error,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
