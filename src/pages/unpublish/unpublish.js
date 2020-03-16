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
import defaltImage from '../../images/video-icon.jpg'
//import Autocomplete from '@material-ui/lab/Autocomplete';
var Parse = require('parse/node');


class Publish extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Feeds:[],
      TodayWeekMonth:'Filter',
    }

  }

  componentDidMount(){
    this.getFeedsData();
  }

  getFeedsData(){
    const MyCustomClass = Parse.Object.extend('Report');
    const query = new Parse.Query(MyCustomClass);
    query.include('reportedBy');
    query.include('post');
    //query.equalTo("feedsStatus", "publish");
    query.find().then((results) => {
     const FeedsJeson = JSON.stringify(results);
     

     const Feeds = JSON.parse(FeedsJeson).map(item => {
      return {...item , count : 1 , postID : item.post.objectId};
    });

    const UniqueFeeds  = [];
    const UniqueFeedIds = [];

    Feeds.forEach(item => {
      if(UniqueFeedIds.indexOf(item.postID) === -1)
      {
        UniqueFeedIds.push(item.postID);
        UniqueFeeds.push(item)
      }
      else {
       const postIndex = UniqueFeeds.findIndex(post => item.postID == post.postID)
       const updatedFeed = UniqueFeeds[postIndex];

       updatedFeed['count'] = updatedFeed['count'] + 1;

       UniqueFeeds[postIndex] = updatedFeed;
      }
    })

     const filterData = UniqueFeeds.filter((data,i) => {
       if(data.post.feedsStatus === 'unpublish'){
         return data;
       }
     });

     
    this.setState({
      Feeds:filterData,
    })

    });

  }

  handleSerch = (event) => {
    const MyCustomClass = Parse.Object.extend('Report');
    const query = new Parse.Query(MyCustomClass);
    query.startsWith('reason', event.target.value);
    query.find().then((results) => {
      const FeedsJeson = JSON.stringify(results);
      const Feeds = JSON.parse(FeedsJeson);
     this.setState({
       Feeds:Feeds,
     })
 
     });
  }

  PublishClick = (pid)  => {
    const Posts = Parse.Object.extend('Post');
    const query = new Parse.Query(Posts);
    // here you put the objectId that you want to update
    query.get(pid).then((object) => {
      object.set('feedsStatus', 'publish')
      object.save().then((response) => {
        toast.configure({
          autoClose: 2000,
          draggable: false,
          //etc you get the idea
        });
        toast("Post Published Successfully");
        this.getFeedsData();
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating Post: ${JSON.stringify(error)}`);
        console.error('Error while updating Post', error);
      });
    });
}

  handleWeekMonthValue = (e) => {
    //console.log(data);
    const post = Parse.Object.extend('Post');
    const query = new Parse.Query(post);
    query.equalTo("feedsStatus", "publish");
    query.find().then((results) => {
      
      const FeedsJeson = JSON.stringify(results);
      const Feeds = JSON.parse(FeedsJeson);

       //console.log(e.target.value);
      
        const filteredData =  Feeds.filter((data,i) => {

          if(e.target.value == 'today'){
            var pDate = new Date(data.createdAt)
            var cDate = new Date()
            const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
            //console.log(dataFormate)
            if(dataFormate < 1 ){
              return data;
              
            }
          } 
          
          if(e.target.value == 'week'){
            var pDate = new Date(data.createdAt)
            var cDate = new Date()
            const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
            //console.log(dataFormate)
            if(dataFormate < 6 ){
              return data;
              
            }
          }
          
          if(e.target.value == 'month'){
            var pDate = new Date(data.createdAt)
            var cDate = new Date()
            const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
            //console.log(dataFormate)
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
    


  render() {
    let Feeds = this.state.Feeds;
     //console.log(Feeds);

return (
<>
    <PageTitle title="Published Post" />
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
            style={{ width:280 }}
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
    </Grid>
    
    <Grid container spacing={4}>
       { Feeds.map((data,i) =>  
         
        <Grid item xs={4}>
            <Card >
              <CardHeader
                subheader={moment(data.createdAt).format('dddd, MMMM Do YYYY')}
                title={"Repoted By " + data.reportedBy ? data.reportedBy.name : ''}
              />
              { data.post.type === 'photo' || data.post.type ==='drama' ? <img style={{width:'350px', height:'150px'}} src={data.post ? data.post.content.url : defaltImage} /> : <img style={{width:'200px',height:'150px',margin:'0 auto',display:'block'}} src={defaltImage} /> }
              <button style={{ margin:'0 auto',display:'block',marginTop:'10px' }}>Repoted : {data.count} Time</button>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {data.reason ? data.reason.substr(0,45): data.reason }
                </Typography>
                
              </CardContent>
              <CardActions>
              <Grid
                  justify="space-between" 
                  container 
                  spacing={50}
                >
                  <Button size="large" variant="contained" color="primary" onClick={()=>this.PublishClick(data.post.objectId) } fullWidth>
                     Publish Post?
                    </Button>
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

export default Publish;





