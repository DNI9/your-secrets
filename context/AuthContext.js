import {useState, useEffect, useContext, createContext} from 'react';
import {auth, googleAuthProvider} from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Sign in with Google
  function signInWithGoogle() {
    return auth.signInWithPopup(googleAuthProvider);
  }

  // Logout
  function logout() {
    return auth.signOut();
  }

  // to show snackbar
  function showAlert(alertDetails, timeout = 3000) {
    setAlert(alertDetails);
    setTimeout(() => {
      setAlert(null);
    }, timeout);
  }

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      // console.log(user);
      setLoading(false);
    });
    return unSub;
  }, []);

  const value = {
    loading,
    currentUser,
    logout,
    signInWithGoogle,
    alert,
    showAlert,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
