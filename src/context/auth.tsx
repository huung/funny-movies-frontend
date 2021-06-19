import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

interface IAuthState {
  user: any;
}

type AuthContextType = {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
};

const initialState: IAuthState = {
  user: null,
};

const token = localStorage.getItem("jwtToken");
if (token) {
  const decodedToken: any = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const context: AuthContextType = {
  user: null,
  login: (userData: any) => {},
  logout: () => {},
};

const AuthContext = createContext(context);

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: any) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
