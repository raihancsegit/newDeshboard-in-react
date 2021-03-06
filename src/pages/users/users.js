import React from "react";

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
import Button from '@material-ui/core/Button';
import userAvatar from '../../images/userAvatar.png'
var Parse = require('parse/node');

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      role:'user',
    }
  }

  componentDidMount(){
    this.getData();
  }
  getData(){
    const MyCustomClass = Parse.Object.extend('User');
    const query = new Parse.Query(MyCustomClass);
    //query.include('userType');
    query.find().then((results) => {
      
     const userJeson = JSON.stringify(results);
     const user = JSON.parse(userJeson);
     //console.log(user);
    
    this.setState({
      users:user,
      isUser:true,
      
    })

    });

  }

  handleChangeDea = (objectid) => {
  
    const User = new Parse.User();
    const query = new Parse.Query(User);
    // Finds the user by its ID
    query.get(objectid).then((user) => {
      // Updates the data we want
      //user.set('gender', 'female');
      user.set('isUserBan', false);
      // Saves the user with the updated data
      console.log('Current User record is ' + JSON.stringify(Parse.User.current()));
      var aValue = localStorage.getItem('id_token');
      
      
      user.save(null, { useMasterKey: true }).then((response) => {
        
        this.setState({isUser:false})
        
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.error("User Deactive Successfully", options);
        
        this.getData();
        //window.location.reload();
        // if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
        // console.log('Updated user', response);
      }).catch((error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
        console.error('Error while updating user', error);
      });
     });
      
    
  }

  handleChangeActive = (objectid) => {
  
    const User = new Parse.User();
    const query = new Parse.Query(User);

    // Finds the user by its ID
    query.get(objectid).then((user) => {
      // Updates the data we want
      //user.set('gender', 'female');
      user.set('isUserBan', true);
      // Saves the user with the updated data
      console.log('Current User record is ' + JSON.stringify(Parse.User.current()));
      user.save(null, { useMasterKey: true }).then((response) => {
        //localStorage.getItem('id_token');
        //{lastLogin:new Date()}, { sessionToken: user.get("sessionToken") }
        this.setState({isUser:true})
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.success("User Active Successfully", options);
        this.getData();
        //window.location.reload();
        // if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
        // console.log('Updated user', response);
      }).catch((error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
        console.error('Error while updating user', error);
      });
     });
      
    
  }

  
  handleClick = (e, data) => {
    //console.log(data.objectId);
    const User = new Parse.User();
    const query = new Parse.Query(User);

    query.get(data.objectId).then((user) => {
      // Updates the data we want
      //user.set('gender', 'female');
      user.set('userType', e.target.value);
      // Saves the user with the updated data
      console.log('Current User record is ' + JSON.stringify(Parse.User.current()));
      user.save(null, { useMasterKey: true }).then((response) => {
        this.setState({role:e.target.value});
        toast.configure({
          autoClose: 2000,
          draggable: false,
          //etc you get the idea
        });
        toast("Change User Role");
        this.getData();
        //window.location.reload();
        // if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
        // console.log('Updated user', response);
      }).catch((error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
        console.error('Error while updating user', error);
      });
     });
    
  };

  handleActiveDeactive = (e, data) => {
    //console.log(data.objectId);
    const User = new Parse.User();
    const query = new Parse.Query(User);

    query.get(data.objectId).then((user) => {
      // Updates the data we want
      //user.set('gender', 'female');
      if(e.target.value === true){
        user.set('isUserBan', e.target.value);
        user.save(null, { useMasterKey: true }).then((response) => {
          this.setState({isUser:e.target.value})
          const options = toast.configure({
            autoClose: 2000,
            draggable: false,
          });
          toast.success("User Active Successfully", options);
          this.getData();
          //window.location.reload();
          // if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
          // console.log('Updated user', response);
        }).catch((error) => {
          if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
          console.error('Error while updating user', error);
        });
      }

      if(e.target.value === false){
        user.set('isUserBan', e.target.value);
        user.save(null, { useMasterKey: true }).then((response) => {
          this.setState({isUser:e.target.value})
          const options = toast.configure({
            autoClose: 2000,
            draggable: false,
          });
          //toast("User Active Successfully");
          toast.error("User Deactive Successfully", options);
          this.getData();
          //window.location.reload();
          // if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
          // console.log('Updated user', response);
        }).catch((error) => {
          if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
          console.error('Error while updating user', error);
        });
      }
      

     });
    
  };

  

  render() {
    
      let users = this.state.users;
      //let isUser = this.state.isUser;
      //console.log(users);
  

    const userDataTable = 
       
      users.map((data,i) =>
        
      [
      <img style={{width:'50px'}} src={data.photo ? data.photo.url : userAvatar} />,data.name, data.gender, data.followerCount,data.followingCount,data.postCount,data.bookmarkCount,
      
        localStorage.getItem('userType') === 'admin' ? (
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={data.isUserBan}
            onChange={((e) => this.handleActiveDeactive(e, data))}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Deactive</MenuItem>
          </Select>
          ) : (
          <Select
          disabled
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={data.isUserBan}
            onChange={((e) => this.handleActiveDeactive(e, data))}
          >
            
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Deactive</MenuItem>
          </Select>
          ),
  
       localStorage.getItem('userType') === 'admin' ? (
       <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={data.userType}
          onChange={((e) => this.handleClick(e, data))}
        >
         <MenuItem value="moderator">
                Moderator
            </MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
       ) : (
        <Select
        disabled
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={data.userType}
          onChange={((e) => this.handleClick(e, data))}
        >
          <MenuItem value="moderator">
              Moderator
            </MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
       ),

      ]
      
      
      );

      

      const columns = [
        {
         name: "Photo",
         label: "Photo",
         options: {
          filter: false,
          sort: false,
         }
        },
        {
         name: "Name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        
        {
         name: "Gender",
         label: "Gender",
         options: {
          filter: true,
        }
        },
        {
          name: "followerCount",
          label: "followerCount",
          options: {
            filter: false,
            sort: false,
           }
         },
         {
          name: "followingCount",
          label: "followingCount",
          options: {
            filter: false,
            sort: false,
           }
         },
         {
          name: "postCount",
          label: "postCount",
          options: {
            filter: false,
            sort: false,
           }
         },
         {
          name: "BookmarkCount",
          label: "BookmarkCount",
          options: {
            filter: false,
            sort: false,
           }
         },
        
         {
          name: "Active User",
          label: "Active User",
          options: {
            filter: false,
            sort: false,
           }
         },

         {
          name: "Change Role",
          label: "Change Role",
          options: {
            filter: false,
            sort: false,
           }
         },
       ];

    return (
      <>
      <PageTitle title="Users List" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Users List"
                data={userDataTable}
                columns={columns}
                options={{
                  filterType: 'dropdown',
                  selectableRows:'none',
                  download:false,
                  rowsPerPageOptions:[10,20,30,40,50,60],
                  textLabels: {
                        body: {
                          noMatch: "Please wait loading data",
                        }
                      }  
                }}
              />
          </Grid>
      </Grid>
      </>
    );
    
    
  }
}

export default Users;


