import React, {
  useState, useEffect, useContext, useMemo, useCallback,
} from 'react';
import { GlobalContext } from './Global.context';

export const UserContext = React.createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [visibleBtn, setVisibleBtn] = useState([]);
  const { setLoading } = useContext(GlobalContext);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // abortcontroller - позволяет отменить запрос вручную (встроен в браузер)
    const abortController = new AbortController();

    fetch('http://localhost:6622/api/auth', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === 'Пользователя не существует!') {
          setUser(null);
        } else {
          setUser(res.user);
          setLoading(false);
        }
      })
      .catch(console.error);

    return () => {
      abortController.abort();
    };
  }, []);
  const handleLogout = useCallback(() => {
    fetch('http://localhost:6622/api/auth/signout').then((res) => {
      if (res.status === 200) { setUser(null); }
    });
  }, []);

  const value = useMemo(() => ({
    user, setUser, handleLogout, visibleBtn, setVisibleBtn, score, setScore,
  }));

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
