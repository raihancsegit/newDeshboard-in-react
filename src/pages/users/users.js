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

  

  render() {
    
      let users = this.state.users;
      //let isUser = this.state.isUser;
      //console.log(users);
  

    const userDataTable = 
      users.map((data,i) =>
      
      [
      <img style={{width:'50px'}} src={data.photo ? data.photo.url : 'No Image'} />,data.name, data.username, data.gender, data.followerCount,data.followingCount,data.postCount,data.bookmarkCount,data.isUserBan == true ? "Active" : "Deactive",
      localStorage.getItem('userType') === 'admin' ? (
        <Button variant="contained" color="secondary" size="small"
         onClick={()=>this.handleChangeDea(data.objectId)}
       >Deactive</Button>
      ) : (
        <Button variant="contained" color="secondary" disabled size="small"
      onClick={()=>this.handleChangeDea(data.objectId)}
    >Deactive</Button>
    ),

    localStorage.getItem('userType') === 'admin' ? (
      <Button variant="contained" color="primary" size="small"
         onClick={()=>this.handleChangeActive(data.objectId)}
       >Active</Button>
    ) : (
    <Button variant="contained" color="primary" disabled size="small"
    onClick={()=>this.handleChangeActive(data.objectId)}
  >Active</Button>
  ),
  
       localStorage.getItem('userType') === 'admin' ? (
       <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={data.userType}
          onChange={((e) => this.handleClick(e, data))}
        >
          <MenuItem value="none">
            <em>None</em>
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
          <MenuItem value="none">
            <em>None</em>
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
          name: "Deactive User",
          label: "Deactive User",
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
                  filterType: "multiselect",
                  selectableRows:'none',
                }}
              />
          </Grid>
      </Grid>
      </>
    );
    
    
  }
}

export default Users;


