import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { Link } from 'react-router-dom';
// styles
import useStyles from "./styles";

// logo
//import logo from "./logo.svg";
import logo from "./logo.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var Parse = require('parse/node');
function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  var [forgetPassword,setForgetPassword] = useState("");

  const fogetPassord = () => {
      //console.log(forgetPassword)
      var email = forgetPassword;
      Parse.User.requestPasswordReset(email).then(() => {
        // Password reset request was sent successfully
        // if (typeof document !== 'undefined') document.write('Reset password email sent successfully');
        const options = toast.configure({
          autoClose: 4000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.success("Request Accepting. Check Your Email", options);
      }).catch((error) => {
        const options = toast.configure({
          autoClose: 4000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.success("Enter Valid Email", options);
      })
  }
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography variant="h4" className={classes.logotypeText} style={{ fontSize:'30px' }}>DBC Lifestyles Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
             <Tab label="Login" classes={{ root: classes.tab }} /> 
            <Tab label="Forget Password" classes={{ root: classes.tab }} /> 

          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h5" className={classes.greeting}>
                Admin Login
              </Typography>
              
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        //setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}

                {/* <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  <Link to={"forget-password/"}>Forget Password</Link>
                </Button> */}

              </div>
            </React.Fragment>
          )}

          {activeTabId === 1 && (

            <React.Fragment>
              <Typography variant="h6" className={classes.greeting}>
                Forget Password
              </Typography>
             
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                //value={loginValue}
                onChange={e => setForgetPassword(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              
              <div className={classes.creatingButtonContainer}>
                
                  <Button
                    onClick={() => {fogetPassord()}}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Reset Password
                  </Button>
                
              </div>
              
              
            </React.Fragment>
          )}
        </div>
        
      </div>
    </Grid>
  );
}

export default withRouter(Login);
