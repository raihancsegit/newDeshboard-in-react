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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AppleIcon from '@material-ui/icons/Apple';
import AndroidSharpIcon from '@material-ui/icons/AndroidSharp';
import moment from 'moment';
import userAvatar from '../../images/userAvatar.png'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
var Parse = require('parse/node');

class Details extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      postDetails:[],
      andriod:'',
      ios:'',
    }
  }
  componentDidMount(){
    this.getFeedsData();
    console.log(this.props);
    const objectId = this.props.match.params.post_id;
    this.setState({
      id:objectId
    })

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

  getFeedsData(){
    const objectId = this.props.match.params.post_id;
    const MyCustomClass = Parse.Object.extend('Post');
    const query = new Parse.Query(MyCustomClass);
    query.include('postedBy');
    query.equalTo("objectId", objectId);
    query.find().then((results) => {
     const FeedsJeson = JSON.stringify(results);
     const Feeds = JSON.parse(FeedsJeson);

      this.setState({
        postDetails:Feeds,
      })

    });  
  }

  render() {
   const postDetails = this.state.postDetails;
  
   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 0,
          paddingTop: '56.25%', // 16:9
        },
        expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        },
        avatar: {
          backgroundColor: red[500],
        },
      }),
 );

 //const classes = this.useStyles();
   
   const detailsPost = postDetails.map(details => {
     return(
      <Container maxWidth="sm" style={{ color:'#fff' }}>
          <Card className="sad" style={{ marginBottom:'20px',background:'#1D1C1C',color:"#fff"}}>
            <div style={{ color:'#fff' }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" style={{ background:'red' }}>
                    <img style={{ width:'50px', height:'40px' }} src={details.postedBy ? details.postedBy.photo.url : userAvatar } />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" style={{ color:'#fff' }}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={details.postedBy ? details.postedBy.username : ''}
                //subheader={moment(details.createdAt).format('MMMM Do YYYY')}
              />
              <p style={{ marginLeft:'70px',marginTop:'-30px',fontSize:'10px' }}>{moment(details.createdAt).format('MMMM Do YYYY')}</p>
              </div>
              {/* <div>
                <h3 style={{ margin:"15px 0 5px 0"}}>{details.postedBy ? details.postedBy.username : ''}</h3>
                <h6 style={{ margin:"0 0 5px 0"}}>{moment(details.createdAt).format('MMMM Do YYYY')}</h6>
              </div> */}
              
              {details.type === 'photo' || details.type === 'drama' ?
              <img style={{ width:'100%', height:'450' }} src={ details ? details.content.url : defaltImage} /> :
              <img style={{ width:'100%', height:'350px' }} src={defaltImage} />
              }
              
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" style={{ color:'#fff' }}>
            <WhatshotOutlinedIcon style={{ color:'red' }} /> <span style={{ marginLeft:'5px',fontSize:'15px' }}>{details ? details.likeCount : ''}</span>
                </IconButton>

                <IconButton aria-label="add to favorites" style={{ color:'#FFF' }}>
                  <CloudOutlinedIcon /> <span style={{ marginLeft:'7px',fontSize:'15px' }}>{details ? details.dislikeCount : ''}</span>
                </IconButton>
                

                <IconButton aria-label="Chart" style={{ color:'#FFF' }}>
                  <TextsmsOutlinedIcon /> <span style={{ marginLeft:'5px',fontSize:'15px' }}>{details ? details.commentCount : ''}</span>
                </IconButton>
                
                <IconButton aria-label="share" style={{ color:'#FFF' }}>
                  <ShareIcon /> <span style={{ marginLeft:'5px',fontSize:'15px' }}>{details ? details.shareCount : ''}</span>
                </IconButton>

                <IconButton aria-label="share" style={{ color:'#FFF', marginLeft:'100px'}}>
                  <BookmarkBorderOutlinedIcon />
                </IconButton>
                
          </CardActions>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{ color:'#FFF' }}>
                  {details.postText}
                </Typography>
              </CardContent>
        </Card>
      </Container>
     )
   })
    return(
       <>
          
          {detailsPost}

          <Card style={{ background:'#1D1C1C',padding:'40px'}}>
            <h1 style={{ textAlign:'center',color:'#fff' }}>Download App</h1>
             <div style={{ margin:'0 auto', display:'block',textAlign:'center'}}>
                <a href={this.state.ios} style={{ textDecoration:'none' }}>
                    <Button
                        style={{ marginRight:'20px' }}
                        variant="contained"
                        color="primary"
                        startIcon={<AppleIcon />}
                        size="large"
                      >
                      Download From Apple Store
                  </Button>
                  </a>
                <a href={this.state.andriod} style={{ textDecoration:'none' }}>
                  <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AndroidSharpIcon />}
                        size="large"
                      >
                    Download From Google Play 
                  </Button>
                </a>
            </div>
          </Card>
          
        </>
    )
  }
}


export default Details


