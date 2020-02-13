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
import 'react-toastify/dist/ReactToastify.css';

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
//import Autocomplete from '@material-ui/lab/Autocomplete';
var Parse = require('parse/node');

class Active extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Feeds:[],
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
    // const queryValue = event.target.value;
    // console.log(queryValue);
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
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value="publish"
                //onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Filter List</em>
                </MenuItem>
                <MenuItem value="publish">Publish</MenuItem>
                <MenuItem value="unpublish">Unpublish</MenuItem>
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
              <img src={data.content.url}  width="350" height="200"/>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {data.postText}

                  
                </Typography>
                
              </CardContent>
              <CardActions>
              <Grid
                  justify="space-between" // Add it here :)
                  container 
                  spacing={50}
                >
                  <Button variant="contained" color="primary" >
                    Publish
                  </Button>
                </Grid>
                
                  <Button variant="contained" color="secondary" >
                    Unpublish
                  </Button>
               
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





