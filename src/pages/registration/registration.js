import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate";
import Container from '@material-ui/core/Container';
import PageTitle from "../../components/PageTitle/PageTitle";
import defaltImage from '../../images/video-icon.jpg'
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AppleIcon from '@material-ui/icons/Apple';
import AndroidSharpIcon from '@material-ui/icons/AndroidSharp';
import moment from 'moment';
import userAvatar from '../../images/userAvatar.png'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { Redirect } from 'react-router-dom'
import logo from "./logo.png";
var Parse = require('parse/node');

class Registration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      username: null,
      email: null,
      password: null,
      repassword: null,
      gender:null,
      whoId:null,
    }
  }
componentDidMount(){
  const objectId = this.props.match.params.who;
  this.setState({
    whoId:objectId
  })
}
  register() {
    const name = this.state.name;
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const repassword = this.state.repassword;
    const gender = this.state.gender;

    if(password === repassword){
      const checkPassword = this.state.password
      const user = new Parse.User()
      user.set('name', name);
      user.set('username', username);
      user.set('email', email);
      user.set('gender', gender);
      user.set('password', checkPassword);
      user.set('userType', 'user');
      user.set('bookmarkCount', 0);
      user.set('followerCount', 0);
      user.set('postCount', 0);
      user.set('videoNotificationOn', true);
      user.set('profileVisibility', 'public');
      user.set('followingCount', 0);
      user.set('isUserBan', false);
      user.set('photoNotificationOn', true);
      user.set('dramaNotificationOn', true);
      user.set('friendNotificationOn', true);
      user.set('agreedToTandC', false);

      user.signUp().then((user) => {

        Parse.Cloud.run('makeFollowing', {whoId: this.state.whoId, whomId: user.id}).then(function(ratings) {
          console.log(ratings);
        });
        console.log("whoid "+ this.state.whoId);
        console.log(user.id);
        // const params =  { whoId: this.state.whoId,  whomId: user.objectId};
        // const response = await Parse.Cloud.run("makeFollowing", params);

        alert("Successfully User Registration")
        this.props.history.push('/download')
      }).catch(error => {
        if (typeof document !== 'undefined') document.write(`Error while signing up user: ${JSON.stringify(error)}`);
        console.error('Error while signing up user', error);
      });

    }else {
      const options = toast.configure({
        autoClose: 2000,
        draggable: false,
      });
      //toast("User Active Successfully");
      toast.success("Password And reEnter Password Dose not match", options);
    }
  
  }

  render() {
   const postDetails = this.state.postDetails;
   const whoId = this.state.whoId;
   console.log(whoId);
  
    return(
       <>
          <Container maxWidth="sm" style={{ color:'#fff' }}>
            <Card className="sad" style={{ marginBottom:'20px',color:"#fff",background:'#1D1C1C',marginTop:'20px'}}>
              <div style={{ padding:'15px' }}>
                    <div style={{ textAlign:'center' }}>
                      <img style={{ textAlign:'center' }} src={logo} alt="logo" />
                      <h2 style={{ textAlign:'center' }}>Sign Up</h2>
                    </div>
                      
                      <input type="text" placeholder="Your Name" style={{ width:'100%',padding:'15px',marginBottom:'15px',background: '#1D1C1C',borderRadius:'10px', color:'#fff' }}
                      onChange={(event) => {this.setState({name:event.target.value})}}
                      />
                      <input type="text" placeholder="Username" style={{ width:'100%',padding:'15px',marginBottom:'15px',background: '#1D1C1C',borderRadius:'10px', color:'#fff' }}
                      onChange={(event) => {this.setState({username:event.target.value})}}
                      />
                      <input type="text" placeholder="Your Email" style={{ width:'100%',padding:'15px',marginBottom:'15px',background: '#1D1C1C',borderRadius:'10px', color:'#fff' }}
                      onChange={(event) => {this.setState({email:event.target.value})}}
                      />
                      <input type="text" placeholder="Password" style={{ width:'100%',padding:'15px',marginBottom:'15px',background: '#1D1C1C',borderRadius:'10px', color:'#fff' }}
                      onChange={(event) => {this.setState({password:event.target.value})}}
                      />
                      <input type="text" placeholder="Retype Password" style={{ width:'100%',padding:'15px',marginBottom:'15px',background: '#1D1C1C',borderRadius:'10px', color:'#fff' }}
                      onChange={(event) => {this.setState({repassword:event.target.value})}}
                      />
                      <input type="radio" value="Male" name="gender" 
                      onChange={(event) => {this.setState({gender:event.target.value})}}/><label for="male">Male</label>

                      <input type="radio" value="Female" name="gender" 
                      onChange={(event) => {this.setState({gender:event.target.value})}}/><label for="female">Female</label>

                      {/* <button style={{ display:'block',width:'100%',padding:'10px',marginTop:'10px',background:'#d6d60f',borderColor:'#d6d60f' }} 
                      onClick={() => {this.register}}
                      >Get Started</button> */}
                      <button 
                      style={{ display:'block',width:'100%',padding:'10px',marginTop:'10px',background:'#d6d60f',borderColor:'#d6d60f' }}
                      onClick={() => {this.register()}}>
                        Get Started
                      </button>
                  
              </div>
              
              
              </Card>
          </Container>
          
        </>
    )
  }
}


export default Registration


