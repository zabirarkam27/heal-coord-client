import { createContext, useState, useEffect } from "react";
import app from "../firebase/firebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic=useAxiosPublic()

  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo ={email: currentUser.email}
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
              console.log("JWT response:", res.data);
          }
          })
      }
      else {
        localStorage.removeItem('access-token');
    }
      setLoading(false);
    });
    const storedUser = auth.currentUser;
    if (storedUser) {
      setUser(storedUser);
      setLoading(false);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setUser,
    createNewUser,
    login,
    logOut,
  };
  if (loading) {
    return (
      <p className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </p>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
