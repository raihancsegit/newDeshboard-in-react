import React, { useState } from "react";

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
import defaltImage from '../../images/video-icon.jpg'
import { Link } from 'react-router-dom';
import { Router, browserHistory,Route  } from 'react-router';
import Container from '@material-ui/core/Container';

//import useStyles from "./styles";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut,loginUser } from "../../context/UserContext";

var Parse = require('parse/node');

class Feeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Feeds:[],
      feedsStatus:'publish',
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


  render() {
    
      let Feeds = this.state.Feeds;
      //let isUser = this.state.isUser;
      //console.log(comments);
      //console.log(comments.text);
      
      
    const feedsDataTable = 
      Feeds.map((data,i) =>
        
        [
          data.type === 'photo' || data.type ==='drama' ? <img style={{width:'100px'}} src={data.content ? data.content.url : defaltImage} /> : <img style={{width:'100px'}} src={defaltImage} />,data.type,data.postText ? data.postText.substr(0,100):data.postText,data.dislikeCount,data.likeCount,data.commentCount,
          //console.log(data.content),
          
        <Link to={"post-details/" + data.objectId }>Details</Link>
        
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
          name: "Type",
          label: "Type",
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
          name: "Details",
          label: "Details",
          options: {
           filter: true,
           sort: true,
          }
         },
        
         
       ];

    return (
      <>
      <Container maxWidth="md">
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
      </Container>
      </>
    );
    
    
  }
}

export default Feeds;
