import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";

export function useAuthHook() {
  const auth = getAuth();
  const [userAuth, setUserAuth] = useState<User | null>(null);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
    });
    return () => unsuscribe();
    // eslint-disable-next-line
  }, [userAuth]);

  return userAuth;
}