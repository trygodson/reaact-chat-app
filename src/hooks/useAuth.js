import { useEffect, useState } from 'react';
import { fb } from 'service';

export const UseAuth = () => {
  const [authUser, setAuthUser] = useState(); //undefined || firebase.user || null

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return {
    authUser,
  };
};
