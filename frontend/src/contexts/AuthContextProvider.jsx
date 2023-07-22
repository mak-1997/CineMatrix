import React from "react";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");
  const [admin_flag, set_Admin_flag] = React.useState(false);

  // React.useEffect(() => {
  //   const getName = localStorage.getItem("cinematrix_username");
  //   const getToken = localStorage.getItem("cinematrix_token");

  //   console.log(getName)
  //   setUsername(getName);
  //   setToken(getToken);

  // }, [username]);

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        token,
        setToken,
        admin_flag,
        set_Admin_flag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
