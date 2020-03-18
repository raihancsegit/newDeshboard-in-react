import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function loginUser(dispatch, login, password, history,setError) {
  setError(false);
  //setIsLoading(true);

      // Pass the username and password to logIn function

    Parse.User.logIn(login,password).then((user) => {

      localStorage.setItem('id_token', user.get("sessionToken"))
      localStorage.setItem('user', user.get("name"))
      localStorage.setItem('userEmail', user.get("email"))
      localStorage.setItem('userType', user.get("userType"))
      localStorage.setItem('isBan', user.get("isUserBan"))
      
      localStorage.setItem('userAvatar', JSON.stringify(user.get("photo")))

      localStorage.setItem('alluser', JSON.stringify(user))

      

         //alert(localStorage.getItem('userType'));

      if(localStorage.getItem('userType') === 'admin' || localStorage.getItem('userType') === 'moderator')  {
       //alert(localStorage.getItem('isBan'))
       if(localStorage.getItem('isBan') == 'true')
       {

        if (!!login && !!password) {
          setTimeout(() => {
            var currentUser = Parse.User.current(); 
            currentUser.fetch().then(function(fetchedUser) {
              var name = fetchedUser.getUsername();
              //alert(currentUser);
              //console.log(fetchedUser);
              localStorage.setItem('cuser', JSON.stringify(currentUser))
              // const filterdata = currentUser.filter(data => {
              //   console.log("data "+data)
              // })
              const options = toast.configure({
                autoClose: 1000,
                draggable: false,
              });
              //toast("User Active Successfully");
              toast.success("Login was successful", options);
                setError(null)
                //setIsLoading(false)
                dispatch({ type: 'LOGIN_SUCCESS' })
                history.push('/app/dashboard')
            });

          }, 1000);
        } else {
          
          setError(true);
          //setIsLoading(true);

          dispatch({ type: "LOGIN_FAILURE" });
          history.push('/login')
        }

       }else{

        toast.configure({
          autoClose: 2000,
          draggable: false,
          //etc you get the idea
        });
        toast("Your Account is Deactive");
        localStorage.removeItem("id_token");
        dispatch({ type: "SIGN_OUT_SUCCESS" });
        history.push("/login"); 

       }
        
      }else{
          toast.configure({
            autoClose: 2000,
            draggable: false,
            //etc you get the idea
          });
          toast("Login Permission Failed..");
          localStorage.removeItem("id_token");
          dispatch({ type: "SIGN_OUT_SUCCESS" });
          history.push("/login");
      }

     


    }).catch(error => {
      
      const options = toast.configure({
        autoClose: 4000,
        draggable: false,
      });
      //toast("User Active Successfully");
      toast.error("Incorrect username or password", options);
    })

  

  
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}


