import {useState, useEffect, useContext, createContext} from 'react';
import {auth, googleAuthProvider} from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  function signInWithGoogle() {
    return auth.signInWithPopup(googleAuthProvider);
  }

  // Logout
  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log(user);
      setLoading(false);
    });
    return unSub;
  }, []);

  const value = {
    currentUser,
    logout,
    signInWithGoogle,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
