import React from "react";
import MUIDataTable from "mui-datatables";
import Box from '@material-ui/core/Box';
import Charts from '../charts/Charts'
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";
import Card from '@material-ui/core/Card';
// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import CountUp from 'react-countup';
const mainChartData = getMainChartData();

const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];


const topnews = [
  ["Raihan", 1],
  ["hafiz", 5],
  ["zakaria", 10],
 
];
var Parse = require('parse/node');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount:0,
      dislikeCount:0,
      commentCount:0,
      totaluser:0,
      users:[], 
      post:[],
    }

  }
  componentDidMount(){
    this.getRecenltyData();
    this.getRecenltyNews();
        // const likes = [
        //   { group: { objectId: null, total: { $sum: '$likeCount' } } }
        // ];
        // const dislikes = [
        //   { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
        // ];
        // const commentCount = [
        //   { group: { objectId: null, total: { $sum: '$commentCount' } } }
        // ];
        // let ex = new Parse.Query("Post");
        // let currentComponent = this;
        // ex.aggregate(likes)
        //   .then(function(results) {
        //     //  console.log(results[0].total);
        //     //  const total = results[0].total;
        //     currentComponent.setState({likeCount:results[0].total})
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });

        //   ex.aggregate(dislikes)
        //   .then(function(results) {
        //     //  console.log(results[0].total);
        //     //  const total = results[0].total;
        //     currentComponent.setState({dislikeCount:results[0].total})
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });

        //   ex.aggregate(commentCount)
        //   .then(function(results) {
        //     //  console.log(results[0].total);
        //     //  const total = results[0].total;
        //     currentComponent.setState({commentCount:results[0].total})
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });

        //   let duplicationQuery = new Parse.Query("User");
        //   duplicationQuery.limit(1000); // max limit
        //   duplicationQuery.find().then( function(results) {
        //     currentComponent.setState({totaluser:results.length})
        //       //console.log(results.length);
        //   });
          
    
  }
  getRecenltyData = () => {
    const MyCustomClass = Parse.Object.extend('User');
    const query = new Parse.Query(MyCustomClass);
    query.find().then((results) => {
      
     const userJeson = JSON.stringify(results);
     const user = JSON.parse(userJeson);
      const filteredData =  user.filter((data,i) => {
        var pDate = new Date(data.createdAt)
        var cDate = new Date()
        const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
        console.log(dataFormate)
        if(dataFormate < 7 ){
          return data; 
        }  
      });

      this.setState({
        ...this.state,
        users : filteredData,
      })

    });

    
  }
  getRecenltyNews = () => {
    const MyCustomClass = Parse.Object.extend('Post');
    const query = new Parse.Query(MyCustomClass);
    query.find().then((results) => {
      
     const userJeson = JSON.stringify(results);
     const Post = JSON.parse(userJeson);
      const filteredData =  Post.filter((data,i) => {
        var pDate = new Date(data.createdAt)
        var cDate = new Date()
        const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
        console.log(dataFormate)
        if(dataFormate < 7 ){
          return data; 
        }  
      });

      this.setState({
        ...this.state,
        post : filteredData,
      })

    });

    
  }
  

  render() {
    // let likeTotal    = this.state.likeCount;
    // let dislikeCount = this.state.dislikeCount;
    // let commentCount = this.state.commentCount;
    // let totaluser    = this.state.totaluser;
    let users        = this.state.users;
    let post        = this.state.post;
    const mystyle = {
      color: "rgba(0, 0, 0, 0.87)",
      backgroundColor: "#fff",
      padding: "10px",
      fontFamily: "Arial",
      boxShadow: "5px 10px #888888",
      border:"5px",
      textAlign:'center',
      fontWeight: "400",
    };

    const userDataTable = 
      users.map((data,i) => 
      
      [
      <img style={{width:'50px'}} src={data.photo ? data.photo.url : 'No Image'} />,data.name, data.username, data.gender,
    
      ]
      
    );

  const postDataTable = 
      post.map((data,i) => 
      
      [
      <img style={{width:'50px'}} src={data.content ? data.content.url : 'No Image'} />,data.postText.substr(0,30),
    
      ]
    
    );

    const columns = [
      {
       name: "Photo",
       label: "Photo",
       options: {
        filter: false,
        sort: true,
       }
      },
      {
       name: "Name",
       label: "Name",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "Username",
       label: "Username",
       options: {
        filter: true,
      }
      },
      {
        name: "Gender",
        label: "Gender",
        options: {
         filter: true,
       }
       },
       
     
       
     ];

    return (
      <>
      <PageTitle title="Deshboard" />

      <Grid container spacing={4}>
        <Grid item xs={3}>
          <div style={mystyle}>
            <h2>Total User</h2>
            <CountUp 
                end={10} 
                duration={5.75}
                delay={0}
                />
          </div>
        </Grid>

        <Grid item xs={3}>
          <div style={mystyle}>
            <h2>Total Like</h2>
            <CountUp 
                end={10} 
                duration={5.75}
                delay={0}
                />
          </div>
        </Grid>

        <Grid item xs={3}>
          <div style={mystyle}>
            <h2>Total Dislike</h2>
            <CountUp 
                end={10} 
                duration={5.75}
                delay={0}
                />
          </div>
        </Grid>

        <Grid item xs={3}>
          <div style={mystyle}>
            <h2>Total Comment</h2>
            <CountUp 
                end={10} 
                duration={5.75}
                delay={0}
                />
          </div>
        </Grid>

        

        <Charts />

        <Grid item xs={6}>
          <MUIDataTable
                title="Recently Added Post"
                data={postDataTable}
                columns={["Name", "Post Text"]}
                options={{
                  filter: false,
                  download:false,
                  print:false,
                  rowsPerPage:3,
                  selectableRows:'none',
                }}
              />
          </Grid>

          <Grid item xs={6}>
            <MUIDataTable
              title="Recently Added User"
              data={userDataTable}
              columns={columns}
              options={{
                filterType: "multiselect",
                selectableRows:'none',
                rowsPerPage:3,
              }}
              
            />
          </Grid>

          
      </Grid>

     
        
      </>
    );
  }
}

export default Dashboard;



// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}

