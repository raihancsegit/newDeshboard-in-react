import React, {useState, useRef} from 'react';

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
import moment from 'moment';
import JoditEditor from "jodit-react";
import Button from '@material-ui/core/Button';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField';
var Parse = require('parse/node');


class Settings extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      config: {
        readonly: false,
        toolbar: true,
    },
      homeUrl:'',
      andriodeUrl:'',
      iosUrl:'',
    }

  }

  componentDidMount(){
    const TermsAndPrivacy = Parse.Object.extend('TermsAndPrivacy');
    const query = new Parse.Query(TermsAndPrivacy)
    query.find().then((results) => {
      
     const termsJeson = JSON.stringify(results);
     const terms = JSON.parse(termsJeson);
     const homeUrl = terms.map((data,i)=>{
       return data.homePageUrl;
     });
     const andriodeUrl = terms.map((data,i)=>{
      return data.androidUrl;
    });
    const iosUrl = terms.map((data,i) => {
      return data.iPhoneUrl;
    });
     this.setState({
      ...this.state,
      homeUrl : homeUrl[0],
      andriodeUrl:andriodeUrl[0],
      iosUrl:iosUrl[0]
    })

    });

    
  }

  ValueSubmit = () => {
    const TermsAndPrivacy = Parse.Object.extend('TermsAndPrivacy');
    const  query = new Parse.Query(TermsAndPrivacy);
    query.get('tiKLQ6XmU4').then((object) => {
      object.set('homePageUrl', this.state.homeUrl);
      object.set('androidUrl', this.state.andriodeUrl);
      object.set('iPhoneUrl', this.state.iosUrl);
      object.save().then((response) => {
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.success("Data Update Successfully", options);
      }, (error) => {
        const options = toast.configure({
          autoClose: 2000,
          draggable: false,
        });
        //toast("User Active Successfully");
        toast.error("Data Update Error", options);
      });
    });

    
  }
 
  render() {
    let homeUrl = this.state.homeUrl;
    let andriodeUrl = this.state.andriodeUrl;
    let iosUrl = this.state.iosUrl;
    return (
        <>
          <PageTitle title="Settings" />
          <form  noValidate autoComplete="off">
              <Grid container spacing={4}>
                  <Grid item md={8}>
                    <TextField id="outlined-basic" label="Home Url" variant="outlined" value={homeUrl} fullWidth  onChange={(e) => {this.setState({homeUrl:e.target.value})}}/>
                  </Grid>
                  <Grid item md={8}>
                    <TextField id="outlined-basic" label="Android Url" variant="outlined" value={andriodeUrl} fullWidth onChange={(e) => {this.setState({andriodeUrl:e.target.value})}}/>
                  </Grid>
                  <Grid item md={8}>
                    <TextField id="outlined-basic" label="Ios Url" variant="outlined" value={iosUrl} fullWidth onChange={(e) => {this.setState({iosUrl:e.target.value})}}/>
                  </Grid>
              </Grid>
            </form>
                <Button variant="contained" color="secondary" disableElevation onClick={this.ValueSubmit} style={{marginTop: "20px"}}>
                    Update Settings
                </Button>

          </>
        );
  }

}
export default Settings;


