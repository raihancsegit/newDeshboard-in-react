import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate";
import Container from '@material-ui/core/Container';
import PageTitle from "../../components/PageTitle/PageTitle";
import defaltImage from '../../images/video-icon.jpg'
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { Redirect } from 'react-router-dom'
var Parse = require('parse/node');

class Download extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      andriod:'',
      ios:'',
    }
  }

  componentDidMount(){
    const TermsAndPrivacy = Parse.Object.extend('TermsAndPrivacy');
    const query = new Parse.Query(TermsAndPrivacy)
    query.find().then((results) => {
      
     const termsJeson = JSON.stringify(results);
     const terms = JSON.parse(termsJeson);
     
     const andriodeUrl = terms.map((data,i)=>{
      return data.androidUrl;
    });
    const iosUrl = terms.map((data,i) => {
      return data.iPhoneUrl;
    });
     this.setState({
      ...this.state,
      andriod:andriodeUrl[0],
      ios:iosUrl[0]
    })

    });

    
  }

  render() {
   
    return(
       <>
          <Container maxWidth="sm" style={{ color:'#fff' }}>
            <Card className="sad" style={{ marginBottom:'20px',color:"#fff",background:'#1D1C1C',marginTop:'200px'}}>
              <div style={{ padding:'15px' }}>

                <div>
                  <h2 style={{ textAlign:'center' }}>Download App</h2>
                </div>

                <a href={this.state.andriod}><button style={{ padding:'10px 40px',background:'#1968b9',marginRight:'10px',borderColor:'black',color:'white'}}>Download From Google Play</button></a>
                <a href={this.state.ios}><button style={{ padding:'10px 40px',background:'#1968b9',borderColor:'black',color:'white'}}>Download From Apple Store</button></a>
                  
              </div>
              
              
              </Card>
          </Container>
          
        </>
    )
  }
}


export default Download


