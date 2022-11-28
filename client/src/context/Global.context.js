import React, { useMemo, useState } from 'react';

export const GlobalContext = React.createContext();

export default function GlobalContextProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const value = useMemo(() => ({ loading, setLoading }));

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
