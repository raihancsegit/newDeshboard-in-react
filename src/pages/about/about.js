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
var Parse = require('parse/node');


class About extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      config: {
        readonly: false,
        toolbar: true,
    },
      about:'',
    }

  }

  componentDidMount(){
    const TermsAndPrivacy = Parse.Object.extend('TermsAndPrivacy');
    const query = new Parse.Query(TermsAndPrivacy)
    query.find().then((results) => {
      
     const termsJeson = JSON.stringify(results);
     const terms = JSON.parse(termsJeson);
     const allaboutApp = terms.map((data,i)=>{
       return data.aboutApp;
     });
     this.setState({
      ...this.state,
      about : allaboutApp[0],
    })

    });

    
  }

  ValueSubmit = () => {
    const TermsAndPrivacy = Parse.Object.extend('TermsAndPrivacy');
    const  query = new Parse.Query(TermsAndPrivacy);
    query.get('tiKLQ6XmU4').then((object) => {
      object.set('aboutApp', this.state.about);
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
    let about = this.state.about;
    return (
        <>
          <PageTitle title="About App" />
              <CKEditor
                    editor={ ClassicEditor }
                    data={about}
                    onChange={(e,editor) => {this.setState({about:editor.getData()})}}
                />
                <Button variant="contained" color="secondary" disableElevation onClick={this.ValueSubmit} style={{marginTop: "20px"}}>
                    Update About App
                </Button>

          </>
        );
  }

}
export default About;


