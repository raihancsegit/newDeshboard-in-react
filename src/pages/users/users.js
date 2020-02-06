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

    const MyCustomClass = Parse.Object.extend('User');
      const query = new Parse.Query(MyCustomClass);
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
    //  const UserClass = Parse.Object.extend('User');
    //  const query = new Parse.Query(UserClass);

    console.log(objectid);
    // here you put the objectId that you want to update
    // query.get(objectid).then((object) => {
    //   object.set('isUserBan', false);
    //   object.save().then((response) => {
    //     // You can use the "get" method to get the value of an attribute
    //     // Ex: response.get("<ATTRIBUTE_NAME>")
    //     if (typeof document !== 'undefined') document.write(`Updated : ${JSON.stringify(response)}`);
    //     console.log('Updated ', response);
    //   }, (error) => {
    //     if (typeof document !== 'undefined') document.write(`Error while updating : ${JSON.stringify(error)}`);
    //     console.error('Error while updating ', error);
    //   });
    // });


    const User = new Parse.User();
    const query = new Parse.Query(User);

    // Finds the user by its ID
    query.get(objectid).then((user) => {
      // Updates the data we want
      //user.set('gender', 'female');
      user.set('isUserBan', false);
      // Saves the user with the updated data
      user.save().then((response) => {
        this.setState({isUser:false})
        toast.configure({
          autoClose: 2000,
          draggable: false,
          //etc you get the idea
        });
        toast("User Deactive");
        window.location.reload();
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
      user.save().then((response) => {
        this.setState({isUser:true})
        toast.configure({
          autoClose: 2000,
          draggable: false,
          //etc you get the idea
        });
        toast("User Active");
        window.location.reload();
        // if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
        // console.log('Updated user', response);
      }).catch((error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
        console.error('Error while updating user', error);
      });
     });
      
    
  }

  

  changeUserRole = (userId) => {
    //console.log(userId);
  }

  

  render() {
    
      let users = this.state.users;
      //let isUser = this.state.isUser;
      console.log(users);
      //console.log("data");

    const userDataTable = 
      users.map((data,i) =>
      
      [
      <img style={{width:'50px'}} src={data.photo.url}/>,data.name, data.username, data.gender, data.followerCount,data.followingCount,data.postCount,data.bookmarkCount,data.isUserBan == true ? "Active" : "Deactive",
      <button
         onClick={()=>this.handleChangeDea(data.objectId)}
       >Deactive</button>,
      <button
         onClick={()=>this.handleChangeActive(data.objectId)}
       >Active</button>,

       <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value=""
          onChange={this.changeUserRole(data.objectId)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
       
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
         name: "Username",
         label: "Username",
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
          name: "Status",
          label: "Status",
          options: {
            filter: false,
            sort: false,
           }
         },
         {
          name: "DeActive User",
          label: "DeActive User",
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
      <PageTitle title="User" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Users List"
                data={userDataTable}
                columns={columns}
                options={{
                  filterType: "multiselect",
                }}
              />
          </Grid>
      </Grid>
      </>
    );
    
    
  }
}

export default Users;


