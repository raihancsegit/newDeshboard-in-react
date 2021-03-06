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
import defaltImage from '../../images/video-icon.jpg'
import moment from 'moment';
var Parse = require('parse/node');

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:[],
      commentStatus:'publish',
    }  
  }


  componentDidMount(){
    this.getCommentData();
  }

  getCommentData(){
    const MyCustomClass = Parse.Object.extend('Comment');
    const query = new Parse.Query(MyCustomClass);
    
    //query.equalTo("post", post);
    query.include('post');
    query.include('user');
    query.find().then((results) => {
      
     const commentJeson = JSON.stringify(results);
     const comments = JSON.parse(commentJeson);
     //console.log(user);
    
    this.setState({
      comments:comments,
    })

    });

      
  }



  handlePublishUnpublish = (e, data) => {
    //console.log(data.objectId);
    const comments = Parse.Object.extend('Comment');
    const query = new Parse.Query(comments);

    query.get(data.objectId).then((Comment) => {
      // Updates the data we want
      //user.set('gender', 'female');
      Comment.set('commentStatus', e.target.value);
      // Saves the user with the updated data
      console.log('Current User record is ' + JSON.stringify(Parse.User.current()));
      Comment.save().then((response) => {
        
        this.setState({commentStatus:e.target.value});
        toast.configure({
          autoClose: 2000,
          draggable: false,
          //etc you get the idea
        });
        toast("Comment Permission Change Successfully.");
        this.getCommentData();
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
    
      let comments = this.state.comments;
      //let isUser = this.state.isUser;
      console.log(comments);
      //console.log(comments.text);
  

    const commentsDataTable = 
      comments.map((data,i) =>
      
      [
        data.post.type === 'photo' || data.post.type ==='drama' ? <img style={{width:'100px',height:'80px'}} src={data.post ? data.post.content.url : defaltImage} /> : <img style={{width:'100px',height:'80px'}} src={defaltImage} />
         ,data.text, data.post ? data.post.postText.substr(0,100) : ' ',data.user ? data.user.name : ' ',moment(data.createdAt).format('MMMM Do YYYY'),
      localStorage.getItem('userType') === 'admin' ? (
       <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={data.commentStatus}
          onChange={((e) => this.handlePublishUnpublish(e, data))}
        >,
          <MenuItem value="publish">Publish</MenuItem>
          <MenuItem value="unpublish">Unpublish</MenuItem>
        </Select>
      ) : (
        <Select
          disabled
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={data.commentStatus}
          onChange={((e) => this.handlePublishUnpublish(e, data))}
        >,
          <MenuItem value="publish">Publish</MenuItem>
          <MenuItem value="unpublish">Unpublish</MenuItem>
        </Select>
      )
       
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
         name: "Comment Text",
         label: "Comment Text",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "Post Name",
         label: "Post Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
          name: "User Name",
          label: "User Name",
          options: {
           filter: true,
           sort: true,
          }
         },
         {
          name: "Date",
          label: "Date",
          options: {
           filter: true,
           sort: true,
          }
         },
         {
          name: "Action",
          label: "Action",
          options: {
           filter: false,
           sort: true,
          }
         },
        
         
       ];

    return (
      <>
      <PageTitle title="Comments List" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Comments List"
                data={commentsDataTable}
                columns={columns}
                options={{
                  filterType: "droupdown",
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

export default Comments;


