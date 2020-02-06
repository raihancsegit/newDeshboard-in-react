import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
var Parse = require('parse/node');
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

      // Pass the username and password to logIn function
    Parse.User.logIn(login,password).then((user) => {
      // Do stuff after successful login
      // if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
      // console.log('Logged in user', user);

      if (!!login && !!password) {
        setTimeout(() => {
          localStorage.setItem('id_token', 1)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })

          const currentUser = Parse.User.current();
          const userJeson = JSON.stringify(currentUser);
          const getuserName = JSON.parse(userJeson);
    
          history.push('/app/dashboard')
          
          
        }, 1000);
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      }


    }).catch(error => {
      if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
      console.error('Error while logging in user', error);
    })

  
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}


