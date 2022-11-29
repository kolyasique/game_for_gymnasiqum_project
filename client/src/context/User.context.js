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
  const [modal, setModal] = useState(false);
  const [subDis, setSubDis] = useState(false);

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
        // if (res.msg === 'Пользователя не существует!') {
        //   setUser(null);
        // } else {
        console.log(res, 'Это рес в ЮЗЕР КОНТЕКСТ');
        setUser(res);
        // }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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
    user,
    setUser,
    handleLogout,
    visibleBtn,
    setVisibleBtn,
    score,
    setScore,
    modal,
    setModal,
    subDis,
    setSubDis,
  }));

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
