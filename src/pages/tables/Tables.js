import React from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
//import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import Switch from '@material-ui/core/Switch';
var Parse = require('parse/node');

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React Simple CRUD Application',
      users:[],
      userBan:'false',
      
    }


  
    
  }
  componentDidMount(){

    const MyCustomClass = Parse.Object.extend('User');
      const query = new Parse.Query(MyCustomClass);
      //query.equalTo("myCustomKey1Name", "myCustomKey1Value");
      //query.get("name");
      query.find().then((results) => {
          //You can use the "get" method to get the value of an attribute
        //Ex: response.get("<ATTRIBUTE_NAME>")
      //   if (typeof document !== 'undefined') document.write(`ParseObjects found: ${JSON.stringify(results)}`);
      //   console.log('ParseObjects found:', results);
      // }, (error) => {
      //   if (typeof document !== 'undefined') document.write(`Error while fetching ParseObjects: ${JSON.stringify(error)}`);
      //   console.error('Error while fetching ParseObjects', error);

      
       const fff = JSON.stringify(results);
       const user = JSON.parse(fff);
       console.log(user);
        
      // user.map((use,index)=> {
      //    console.log(use.name);
         
      // })
      this.setState({
        users:user,
      })
      });


      


  }

  handleChange = (objectid) => {
    const MyCustomClass = Parse.Object.extend('User');
    const query = new Parse.Query(MyCustomClass);

    console.log(objectid);
    // here you put the objectId that you want to update
    query.get('JiJAACwaf8').then((object) => {
      object.set('gender', 'male');
      object.save().then((response) => {
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")
        if (typeof document !== 'undefined') document.write(`Updated : ${JSON.stringify(response)}`);
        console.log('Updated ', response);
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating : ${JSON.stringify(error)}`);
        console.error('Error while updating ', error);
      });
    });
      
    
  }
  


  render() {
    
      let datas = this.state.users;

      //console.log(this.state.userBan);
    

      const datatableData = 
       datas.map((data, index) =>
       [
        <li style={{listStyle:'none'}} key={index}><img style={{width:'100px'}} src={console.log(data.photo)} /></li>,
        <li style={{listStyle:'none'}} key={index}>{[data.name]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.username]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.gender]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.followerCount]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.followingCount]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.postCount]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.bookmarkCount]}</li>,
        [<button
          onClick={()=>this.handleChange(data.objectId)}
        >update</button>]
        
      //   ["hafiz", "hafiz@gmail.com", "male", 1,1,1,1,1,1,1,1,1,"active"],
      //   ["zakaria", "zakaria@gmail.com", "male", 1,1,1,1,1,1,1,1,1,"active"],
      //   ["ayon", "ayon@gmail.com", "male", 1,1,1,1,1,1,1,1,1,"active"],
      //   ["sazzad", "sazzad@gmail.com", "male", 1,1,1,1,1,1,1,1,1,"active"],
      //   ["kariba", "kariba@gmail.com", "female", 1,1,1,1,1,1,1,1,1,"active"],
       
      ]);

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
          name: "Active User",
          label: "Active User",
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
                data={datatableData}
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

export default Tables;


