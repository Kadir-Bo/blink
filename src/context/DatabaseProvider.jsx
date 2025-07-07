import { useAuth } from "context";

const { createContext, useContext } = require("react");

const DatabaseContext = createContext();
const useDatabase = () => useContext(DatabaseContext);
const DatabaseContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const values = {};

  return (
    <DatabaseContext.Provider value={values}>
      {children}
    </DatabaseContext.Provider>
  );
};
export { useDatabase, DatabaseContextProvider };
