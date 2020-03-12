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


class Terms extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      config: {
        readonly: false,
        toolbar: true,
    },
      terms:'',
      policy:'',
    }

  }

  componentDidMount(){
    const TermsAndPrivacy = Parse.Object.extend('TermsAndPrivacy');
    const query = new Parse.Query(TermsAndPrivacy)

      query.find().then((results) => {
        const termsJeson = JSON.stringify(results);
        const terms = JSON.parse(termsJeson);
        const alldataTerms = terms.map((data,i)=>{
          return data.termsAndConditions;
        });
        const alldataPolicy = terms.map((data,i)=>{
          return data.privacyPolicy;
          //console.log(data);
        });
        //console.log(alldataPolicy[0]);
        
        this.setState({
          ...this.state,
          terms : alldataTerms[0],
          policy : alldataPolicy[0]
        })

        });
    
     

    
  }

  ValueSubmit = () => {
    const TermsAndPrivacy = Parse.Object.extend('TermsAndPrivacy');
    const  query = new Parse.Query(TermsAndPrivacy);
    query.get('tiKLQ6XmU4').then((object) => {
      object.set('termsAndConditions', this.state.terms);
      object.set('privacyPolicy', this.state.policy);
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
    let terms = this.state.terms;
    let policy = this.state.policy;
    return (
        <>
          <PageTitle title="Terms And Policy" />
              <h3>Terms And Condition</h3>
              <CKEditor
                    editor={ ClassicEditor }
                    data={terms}
                    onChange={(e,editor) => {this.setState({terms:editor.getData()})}}
                />
                <h3>Privacy Policy</h3>
                <CKEditor
                    editor={ ClassicEditor }
                    data={policy}
                    onChange={(ee,editor2) => {this.setState({policy:editor2.getData()})}}
                />
                
                <Button variant="contained" color="secondary" disableElevation onClick={this.ValueSubmit} style={{marginTop: "20px"}}>
                    Change Terms/Condition And Privecy Policy
                </Button>

          </>
        );
  }

}
export default Terms;


