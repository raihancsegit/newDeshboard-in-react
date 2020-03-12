import React from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {
  FormGroup,
  FormLabel,
  ListItemText,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  
} from '@material-ui/core';
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";

// data
import mock from "../dashboard/mock";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { ToastContainer, toast } from 'react-toastify';

import { makeStyles } from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';
//import Autocomplete from '@material-ui/lab/Autocomplete';
var Parse = require('parse/node');


class Active extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Feeds:[],
      TodayWeekMonth:'Filter',
      publishUnpublish:'publish',
    }

  }

  componentDidMount(){
    this.getFeedsData();
  }
  getFeedsData(){
    const MyCustomClass = Parse.Object.extend('Post');
    const query = new Parse.Query(MyCustomClass);
    query.include('postedBy');
    query.find().then((results) => {
      
     const FeedsJeson = JSON.stringify(results);
     const Feeds = JSON.parse(FeedsJeson);
    
    this.setState({
      Feeds:Feeds,
    })

    });

  }

  handleSerch = (event) => {
    const MyCustomClass = Parse.Object.extend('Post');
    const query = new Parse.Query(MyCustomClass);
    query.startsWith('postText', event.target.value);
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

  handleWeekMonthValue = (e, data) => {
    //console.log(data.objectId);
    const post = Parse.Object.extend('Post');
    const query = new Parse.Query(post);
    query.find().then((results) => {
      
      const FeedsJeson = JSON.stringify(results);
      const Feeds = JSON.parse(FeedsJeson);

       //console.log(e.target.value);
      
        const filteredData =  Feeds.filter((data,i) => {

          if(e.target.value == 'today'){
            var pDate = new Date(data.createdAt)
            var cDate = new Date()
            const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
            console.log(dataFormate)
            if(dataFormate < 1 ){
              return data;
              
            }
          } 
          
          if(e.target.value == 'week'){
            var pDate = new Date(data.createdAt)
            var cDate = new Date()
            const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
            console.log(dataFormate)
            if(dataFormate < 6 ){
              return data;
              
            }
          }
          
          if(e.target.value == 'month'){
            var pDate = new Date(data.createdAt)
            var cDate = new Date()
            const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
            console.log(dataFormate)
            if(dataFormate < 29 ){
              return data;
            }
          }  
              
          });
        
        this.setState({
          ...this.state,
          Feeds : filteredData,
          TodayWeekMonth:e.target.value
        })

     });

    }

    handlePublishUnpublishFilter = (e, data) => {
      const MyCustomClass = Parse.Object.extend('Post');
      const query = new Parse.Query(MyCustomClass);
      if(e.target.value == 'publish'){
        query.equalTo("FeedsStatus", "publish");
        query.find().then((results) => {
          
        const FeedsJeson = JSON.stringify(results);
        const Feeds = JSON.parse(FeedsJeson);
        
          this.setState({
            Feeds:Feeds,
            publishUnpublish:'publish',
          })

        });
      }
      if(e.target.value == 'unpublish'){
        query.equalTo("FeedsStatus", "unpublish");
        query.find().then((results) => {
          
        const FeedsJeson = JSON.stringify(results);
        const Feeds = JSON.parse(FeedsJeson);
        
          this.setState({
            Feeds:Feeds,
            publishUnpublish:'unpublish',
          })

        });
      }
        
    }
    


  render() {
    let Feeds = this.state.Feeds;


return (
<>
    <PageTitle title="Active Report List" />
    <Grid container spacing={4}>
        <Grid item xs={4}>
          <form  noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Search" variant="outlined" style={{width: 334}} onChange={this.handleSerch}/>
          </form>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled-label">Filter List</InputLabel>
            <Select
            style={{ width:330 }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.state.TodayWeekMonth}
              onChange={((e) => this.handleWeekMonthValue(e))}
            >
              <MenuItem value="Filter">
                <em>Filter List</em>
              </MenuItem>
              <MenuItem value="today" >Today</MenuItem>
              <MenuItem value="week" >This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled-label">Filter Publish/Unpublish</InputLabel>
            <Select
            style={{ width:330 }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.state.publishUnpublish}
              onChange={((e) => this.handlePublishUnpublishFilter(e))}
            >
              <MenuItem value="Filter">
                <em>Filter List</em>
              </MenuItem>
              <MenuItem value="publish" >Publish</MenuItem>
              <MenuItem value="unpublish" >Unpublish</MenuItem>
            </Select>
          </FormControl>
        </Grid>

    </Grid>
    
    <Grid container spacing={4}>
       { Feeds.map((data,i) =>  
         
        <Grid item xs={4}>
            <Card >
              <CardHeader
                subheader={moment(data.createdAt).format('dddd, MMMM Do YYYY')}
              />
              <img src={data.content ? data.content.url : ''}  width="350" height="200"/>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {data.postText ? data.postText.substr(0,100):data.postText}
                </Typography>
                
              </CardContent>
              <CardActions>
              <Grid
                  justify="space-between" 
                  container 
                  spacing={50}
                >
                  User: {data.postedBy ? data.postedBy.name : ''}
                
                  
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={data.FeedsStatus}
                    onChange={((e) => this.handlePublishUnpublish(e, data))}
                  >
                  <MenuItem value="publish">Publish</MenuItem>
                  <MenuItem value="unpublish">Unpublish</MenuItem>
                </Select> 
                
                  
                </Grid>
                
                  
               
              </CardActions>
            
            </Card>

            
          </Grid>
       )}
       

          
        </Grid>

        
      </>
    );
  }
}

export default Active;





