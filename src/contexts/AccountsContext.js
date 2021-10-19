import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";

const AccountsContext = React.createContext();
const useAccountsContext = () => useContext(AccountsContext);

const AccountsProvider = ({ children }) => {
   /* States */
   const [accounts, setAccounts] = useState([]);
   const [loading, setLoading] = useState(true);

   /* API Variables */
   const defaultSearchParams = useMemo(() => {
      return ['mike', 'louis', 'rachel', 'nas', 'mar', 'kate'];
   }, []);
   const API_KEY = process.env.REACT_APP_API_KEY;
   const API_ENDPOINT = `https://api.unsplash.com`;

   /* getSearchUsers function using useCallBack hook */
   const getSearchUsers = useCallback(
      (defaultParam) => {
         fetch(`${API_ENDPOINT}/search/users?page=1&query=${defaultParam}&client_id=${API_KEY}`)
            .then((response) => response.json())
            .then(({results}) => {
               setAccounts(results);
               setLoading(false);
            });
      }, [API_ENDPOINT, API_KEY]
   );

   useEffect(() => {
      const randomDefaultParam = defaultSearchParams[Math.floor(Math.random() * defaultSearchParams.length)];
      getSearchUsers(randomDefaultParam);
   }, [getSearchUsers, defaultSearchParams]);

   return (
      <AccountsContext.Provider value={{accounts: accounts, setAccounts: setAccounts}}>
         {!loading && children}
      </AccountsContext.Provider>
   );
};

export {AccountsProvider, useAccountsContext}