import React from "react";
import MUIDataTable from "mui-datatables";

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
const datatableData = [
  ["Raihan", "Raihan@gmail.com", "male"],
  ["hafiz", "hafiz@gmail.com", "male"],
  ["zakaria", "zakaria@gmail.com", "male"],
 
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
    }

  }
  componentDidMount(){
        const likes = [
          { group: { objectId: null, total: { $sum: '$likeCount' } } }
        ];
        const dislikes = [
          { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
        ];
        const commentCount = [
          { group: { objectId: null, total: { $sum: '$commentCount' } } }
        ];
        let ex = new Parse.Query("Post");
        let currentComponent = this;
        ex.aggregate(likes)
          .then(function(results) {
            //  console.log(results[0].total);
            //  const total = results[0].total;
            currentComponent.setState({likeCount:results[0].total})
          })
          .catch(function(error) {
            console.log(error);
          });

          ex.aggregate(dislikes)
          .then(function(results) {
            //  console.log(results[0].total);
            //  const total = results[0].total;
            currentComponent.setState({dislikeCount:results[0].total})
          })
          .catch(function(error) {
            console.log(error);
          });

          ex.aggregate(commentCount)
          .then(function(results) {
            //  console.log(results[0].total);
            //  const total = results[0].total;
            currentComponent.setState({commentCount:results[0].total})
          })
          .catch(function(error) {
            console.log(error);
          });


          let duplicationQuery = new Parse.Query("User");
          duplicationQuery.limit(1000); // max limit
          duplicationQuery.find().then( function(results) {
            currentComponent.setState({totaluser:results.length})
              //console.log(results.length);
          });
          
          

    
  }

  render() {
    let likeTotal    = this.state.likeCount;
    let dislikeCount = this.state.dislikeCount;
    let commentCount = this.state.commentCount;
    let totaluser    = this.state.totaluser;
    
    return (
      <>
      <PageTitle title="Deshboard" />

      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Widget
                title="Total User"
                //upperTitle
                //bodyClass={classes.fullHeightBody}
                //className={classes.card}
              >
                <CountUp 
                end={totaluser} 
                duration={5.75}
                delay={0}
                />
                
          </Widget>
        </Grid>

        <Grid item xs={3}>
          <Widget
                title="Total Like"
                upperTitle
                //bodyClass={classes.fullHeightBody}
                //className={classes.card}
              >
                <CountUp 
                end={likeTotal} 
                duration={5.75}
                delay={0}
                />
              
                
          </Widget>
        </Grid>

        <Grid item xs={3}>
          <Widget
                title="Total Dislike"
                upperTitle
                //bodyClass={classes.fullHeightBody}
                //className={classes.card}
              >
                <CountUp 
                  end={dislikeCount} 
                  duration={5.75}
                  delay={0}
                />
          </Widget>
        </Grid>

        <Grid item xs={3}>
          <Widget
                title="Total Comment"
                upperTitle
                //bodyClass={classes.fullHeightBody}
                //className={classes.card}
              >
                <CountUp 
                  end={commentCount} 
                  duration={5.75}
                  delay={0}
                />
          </Widget>
        </Grid>


        <Grid item xs={6}>
          <MUIDataTable
                title="Top News Publisher"
                data={topnews}
                columns={["Name", "Newscount"]}
                options={{
                  filter: false,
                  download:false,
                  print:false
                }}
              />
          </Grid>

          <Grid item xs={6}>
            <MUIDataTable
              title="Recently Added User"
              data={datatableData}
              columns={["Name", "Email", "gender"]}
              
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

