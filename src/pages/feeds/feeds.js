import React from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";

// data
import mock from "../dashboard/mock";

var Parse = require('parse/node');

class Feeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React Simple CRUD Application',
      feeds:[],
    }

    
  }
  componentDidMount(){

    const MyCustomClass = Parse.Object.extend('Post');
      const query = new Parse.Query(MyCustomClass);
      //query.equalTo("myCustomKey1Name", "myCustomKey1Value");
      //query.get("name");
      query.find().then((results) => {
        
       const fff = JSON.stringify(results);
       const post = JSON.parse(fff);
      
      this.setState({
        feeds:post,
      })
    

      });


  }

  handleChange = (objectid) => {
    const MyCustomClass = Parse.Object.extend('Post');
    const query = new Parse.Query(MyCustomClass);
    // here you put the objectId that you want to update
    query.get(objectid).then((object) => {
      object.set('dislikeCount', 1);
      object.save().then((response) => {
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")
        if (typeof document !== 'undefined') document.write(`Updated : ${JSON.stringify(response)}`);
        console.log('Updated ', response);
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating : ${JSON.stringify(error)}`);
        console.error('Error while updating ', error);
      });
    });
      
    
  }

  render() {
    
      let datas = this.state.feeds;
     

    const datatableData = 
       datas.map((data, index) =>
       
       [
        <li style={{listStyle:'none'}} key={index}><img style={{width:'100px'}} src={data.content.url} /></li>,
        <li style={{listStyle:'none'}} key={index}>{[data.postText]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.dislikeCount]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.likeCount]}</li>,
        <li style={{listStyle:'none'}} key={index}>{[data.commentCount]}</li>,
        [<button
          onClick={()=>this.handleChange(data.objectId)}
        >update</button>]
        
      ]);

    return (
      <>
      <PageTitle title="Feeds" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Feeds List"
                data={datatableData}
                columns={["Photo", "Title","DislikeCount","LikeCount","CommentCount","Action"]}
                options={{
                  filterType: "multiselect",
                }}
              />
          </Grid>
      </Grid>
      </>
    );
    
    
  }
}

export default Feeds;


