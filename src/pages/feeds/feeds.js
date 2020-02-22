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

class Feeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Feeds:[],
      FeedsStatus:'publish',
    }
    
  }


  componentDidMount(){
    this.getFeedsData();
  }

  getFeedsData(){
    const MyCustomClass = Parse.Object.extend('Post');
    const query = new Parse.Query(MyCustomClass);
    query.find().then((results) => {
     const FeedsJeson = JSON.stringify(results);
     const Feeds = JSON.parse(FeedsJeson);
    
      this.setState({
        Feeds:Feeds,
      })

    });  
  }



  handlePublishUnpublish = (e, data) => {
    //console.log(data.objectId);
    const post = Parse.Object.extend('Post');
    const query = new Parse.Query(post);

    query.get(data.objectId).then((Post) => {
      // Updates the data we want
      //user.set('gender', 'female');
      Post.set('FeedsStatus', e.target.value);
      // Saves the user with the updated data
      console.log('Current User record is ' + JSON.stringify(Parse.User.current()));
      Post.save().then((response) => {
        
        this.setState({FeedsStatus:e.target.value});
        toast.configure({
          autoClose: 2000,
          draggable: false,
          //etc you get the idea
        });
        toast("Feeds Change Successfull");
        this.getFeedsData();
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
    
      let Feeds = this.state.Feeds;
      //let isUser = this.state.isUser;
      //console.log(comments);
      //console.log(comments.text);
  

    const feedsDataTable = 
      Feeds.map((data,i) =>
        
        [
          <img style={{width:'100px'}} src={data.content.url} />,data.postText.substr(0,100),data.dislikeCount,data.likeCount,data.commentCount,
        <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={data.FeedsStatus}
            onChange={((e) => this.handlePublishUnpublish(e, data))}
          >
            <MenuItem value="publish">Publish</MenuItem>
            <MenuItem value="unpublish">Unpublish</MenuItem>
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
         name: "Title",
         label: "Title",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "DislikeCount",
         label: "DislikeCount",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
          name: "LikeCount",
          label: "LikeCount",
          options: {
           filter: true,
           sort: true,
          }
         },
         {
          name: "commentCount",
          label: "commentCount",
          options: {
           filter: true,
           sort: true,
          }
         },
         {
          name: "Action",
          label: "Action",
          options: {
           filter: true,
           sort: true,
          }
         },
        
         
       ];

    return (
      <>
      <PageTitle title="Post List" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Post List"
                data={feedsDataTable}
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

export default Feeds;





