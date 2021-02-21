import React, { createContext, useCallback, useEffect } from "react";

import { auth, db, GoogleProvider } from "../../lib/firebase";
import { IUserContext } from "./types";
import { useAuthReducer } from "./reducer";

export const AuthContext = createContext<IUserContext>({
  data: null,
  loading: true,
  error: null,
  signinWithGoogle: () => {},
  signout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useAuthReducer();

  const signinWithGoogle = useCallback(async () => {
    try {
      const { user } = await auth.signInWithPopup(GoogleProvider);

      const uid = user?.uid;
      const username = user?.displayName;
      const photoURL = user?.photoURL;
      await db
        .collection("users")
        .doc(uid)
        .set({ username, photoURL }, { merge: true });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error,
      });
    }
  }, [dispatch]);

  const signout = useCallback(() => {
    auth.signOut();
  }, []);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      dispatch({
        type: "AUTH_SUCCESS",
        payload: user,
      });
    });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        data: state.user,
        loading: state.fetching,
        error: state.error,
        signout,
        signinWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
