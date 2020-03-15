import React, {useState, useRef} from 'react';

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";

// data
import mock from "../dashboard/mock";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import JoditEditor from "jodit-react";
import Button from '@material-ui/core/Button';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
var Parse = require('parse/node');


class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      config: {
        readonly: false,
        toolbar: true,
    },
      homeUrl:'',
      andriodeUrl:'',
      iosUrl:'',
      name:'',
      photo:'',
      email:'',
      id:'',
      newPassword:null,
    }
  


  }

  componentDidMount(){

   this.getdata();

  }

 getdata = () => {
        var currentUser = Parse.User.current(); 
        var aValue = localStorage.getItem('id_token');
          Parse.User.become(aValue).then((user) => {
            const userJeson = JSON.stringify(user);
            const users = JSON.parse(userJeson);
            console.log(users.objectId);
      
            this.setState({
              name : users.name,
              photo: users.photo.url,
              email: users.email,
              id:users.objectId,
             })
            //user.setPassword('passwords');

          },(error) => {
            // The token could not be validated.
          });
  
    
  }

  ValueSubmit = (id) => {
    console.log(id.id);
    const user = Parse.Object.extend('User');
    const  query = new Parse.Query(user);
    query.get(id.id).then((object) => {
      object.set('name', this.state.name);
      object.set('email', this.state.email);
      //object.set('password', this.state.newPassword);
      object.save().then((response) => {
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.success("User Update Successfully", options);
      }, (error) => {
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.error("User Update Error", options);
      });
    });
  
    
  }

  passwordChange = (id) => {
    const user = Parse.Object.extend('User');
    const  query = new Parse.Query(user);
    query.get(id.id).then((object) => {
      if(this.state.newPassword){
        object.set('password', this.state.newPassword);
      }
      object.save().then((response) => {
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.success("Password Update Successfully", options);
      }, (error) => {
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.error("Password Update Successfully", options);
      });
    });
  }

  render() {
    let homeUrl = this.state.homeUrl;
    let andriodeUrl = this.state.andriodeUrl;
    let iosUrl = this.state.iosUrl;
    let name = this.state.name;
    let photo = this.state.photo;
    let email = this.state.email;
    let id = this.state.id;
    //console.log(name);
    return (
        <>
          <PageTitle title="Profile" />
            <Card>
              <CardContent>
                <img src={photo} style={{ width:'200px',display:'block', margin:'0 auto',borderRadius:'50%'}}/>
                  <h2 style={{textAlign:'center',marginBottom:'0'}}>{name}</h2>
                  <h3 style={{textAlign:'center',marginTop:'0'}}>{email}</h3>

                  <form  noValidate autoComplete="off">
                      <Grid container spacing={4}>
                          <Grid item  spacing={4} md={8} style={{ display:'block', margin:'0 auto' }}>
                            <TextField 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined" 
                            value={name} 
                            fullWidth  
                            onChange={(e) => {this.setState({name:e.target.value})}}
                            
                            />
                          </Grid>
                          <Grid item md={8} style={{ display:'block', margin:'0 auto' }}>
                            <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined" 
                            value={email} 
                            fullWidth 
                            onChange={(e) => {this.setState({email:e.target.value})}}
                            />
                          </Grid>
                          
                      </Grid>
                      
                          <Button 
                            size="large"
                            variant="contained" 
                            color="secondary" 
                            disableElevation 
                            onClick={() => this.ValueSubmit({id})}
                            style={{ display:'block', margin:'0 auto',marginTop:'20px',marginBottom:'20px' }}
                          >
                            Update Profile
                        </Button>
                    </form>

                    <Card>
                         <Grid item md={8} style={{ display:'block', margin:'0 auto' }}>
                            <TextField 
                            id="outlined-basic" 
                            label="New Password" 
                            variant="outlined" 
                            //value={iosUrl} 
                            fullWidth 
                            onChange={(e) => {this.setState({newPassword:e.target.value})}}
                            />
                          </Grid>

                          <Button 
                            disabled={
                              this.state.newPassword === null 
                            }
                            size="large"
                            variant="contained" 
                            color="secondary" 
                            disableElevation 
                            onClick={() => this.passwordChange({id})}
                            style={{ display:'block', margin:'0 auto',marginTop:'20px', marginBottom:'20px'}}
                            >
                            Update Password
                        </Button>
                    </Card>
                        
                        
                  </CardContent>
              </Card>

          </>
        );
  }

}
export default Profile;


