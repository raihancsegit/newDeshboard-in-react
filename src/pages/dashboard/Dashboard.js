import React, { useState } from "react";
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
import LikeCount from "../../components/LikeCount/LikeCount";

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

// export default function Dashboard(props) {
//   var classes = useStyles();
//   var theme = useTheme();
//   const [likeCount, setLikeCount] = useState(0);

//  const likecount = () => {
//     const likes = [
//       { group: { objectId: null, total: { $sum: '$likeCount' } } }
//     ];
//     var ex = new Parse.Query("Post");
//     ex.aggregate(likes)
//       .then(function(results) {
//          console.log(results[0].total);
//          const total = results[0].total;
//          setLikeCount(total);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//     }

//   // local
//   var [mainChartState, setMainChartState] = useState("monthly");

//   return (
//     <>
//       <PageTitle title="Dashboard" button="Latest Reports" />
//       <Grid container spacing={4}>
//         <Grid item lg={4} md={4} sm={6} xs={12}>
//           <Widget
//             title="Visits Today"
//             upperTitle
//             bodyClass={classes.fullHeightBody}
//             className={classes.card}
//           >
//             <div className={classes.visitsNumberContainer}>
//               <Typography size="xl" weight="medium">
//                 5
//               </Typography>
//               <LineChart
//                 width={55}
//                 height={30}
//                 data={[
//                   { value: 10 },
//                   { value: 15 },
//                   { value: 10 },
//                   { value: 17 },
//                   { value: 18 },
//                 ]}
//                 margin={{ left: theme.spacing(2) }}
//               >
//                 <Line
//                   type="natural"
//                   dataKey="value"
//                   stroke={theme.palette.success.main}
//                   strokeWidth={2}
//                   dot={false}
//                 />
//               </LineChart>
//             </div>
//             <Grid
//               container
//               direction="row"
//               justify="space-between"
//               alignItems="center"
//             >
//               <Grid item>
//                 <Typography color="text" colorBrightness="secondary">
//                   Registrations
//                 </Typography>
//                 <Typography size="md">860</Typography>
//               </Grid>
//               <Grid item>
//                 <Typography color="text" colorBrightness="secondary">
//                   Sign Out
//                 </Typography>
//                 <Typography size="md">32</Typography>
//               </Grid>
//               <Grid item>
//                 <Typography color="text" colorBrightness="secondary">
//                   Rate
//                 </Typography>
//                 <Typography size="md">3.25%</Typography>
//               </Grid>
//             </Grid>
//           </Widget>
//         </Grid>
        
        

//         <Grid item lg={8} md={8} sm={6} xs={12}>
//           <Widget
//             title="Popularity Meter"
//             upperTitle
//             className={classes.card}
//             bodyClass={classes.fullHeightBody}
//           >
//             <div className={classes.serverOverviewElement}>
//               <Typography
//                 color="text"
//                 colorBrightness="secondary"
//                 className={classes.serverOverviewElementText}
//               >
//                 Like : <LikeCount />
//               </Typography>
//               <div className={classes.serverOverviewElementChartWrapper}>
//                 <ResponsiveContainer height={50} width="99%">
//                   <AreaChart data={getRandomData(10)}>
//                     <Area
//                       type="natural"
//                       dataKey="value"
//                       stroke={theme.palette.secondary.main}
//                       fill={theme.palette.secondary.light}
//                       strokeWidth={2}
//                       fillOpacity="0.25"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//             <div className={classes.serverOverviewElement}>
//               <Typography
//                 color="text"
//                 colorBrightness="secondary"
//                 className={classes.serverOverviewElementText}
//               >
//                 Dislike: 2000
//               </Typography>
//               <div className={classes.serverOverviewElementChartWrapper}>
//                 <ResponsiveContainer height={50} width="99%">
//                   <AreaChart data={getRandomData(10)}>
//                     <Area
//                       type="natural"
//                       dataKey="value"
//                       stroke={theme.palette.primary.main}
//                       fill={theme.palette.primary.light}
//                       strokeWidth={2}
//                       fillOpacity="0.25"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//             <div className={classes.serverOverviewElement}>
//               <Typography
//                 color="text"
//                 colorBrightness="secondary"
//                 className={classes.serverOverviewElementText}
//               >
//                 Comments: 2000
//               </Typography>
//               <div className={classes.serverOverviewElementChartWrapper}>
//                 <ResponsiveContainer height={50} width="99%">
//                   <AreaChart data={getRandomData(10)}>
//                     <Area
//                       type="natural"
//                       dataKey="value"
//                       stroke={theme.palette.warning.main}
//                       fill={theme.palette.warning.light}
//                       strokeWidth={2}
//                       fillOpacity="0.25"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </Widget>
//         </Grid>

        


//         <Grid item xs={12}>
//           <Widget
//             bodyClass={classes.mainChartBody}
//             header={
//               <div className={classes.mainChartHeader}>
//                 <Typography
//                   variant="h5"
//                   color="text"
//                   colorBrightness="secondary"
//                 >
//                   Daily Line Chart
//                 </Typography>
//                 <div className={classes.mainChartHeaderLabels}>
//                   <div className={classes.mainChartHeaderLabel}>
//                     <Dot color="warning" />
//                     <Typography className={classes.mainChartLegentElement}>
//                       Like
//                     </Typography>
//                   </div>
//                   <div className={classes.mainChartHeaderLabel}>
//                     <Dot color="primary" />
//                     <Typography className={classes.mainChartLegentElement}>
//                       Unlike
//                     </Typography>
//                   </div>
//                   <div className={classes.mainChartHeaderLabel}>
//                     <Dot color="primary" />
//                     <Typography className={classes.mainChartLegentElement}>
//                       Comment
//                     </Typography>
//                   </div>
//                 </div>
//                 <Select
//                   value={mainChartState}
//                   onChange={e => setMainChartState(e.target.value)}
//                   input={
//                     <OutlinedInput
//                       labelWidth={0}
//                       classes={{
//                         notchedOutline: classes.mainChartSelectRoot,
//                         input: classes.mainChartSelect,
//                       }}
//                     />
//                   }
//                   autoWidth
//                 >
//                   <MenuItem value="daily">Daily</MenuItem>
//                   <MenuItem value="weekly">Weekly</MenuItem>
//                   <MenuItem value="monthly">Monthly</MenuItem>
//                 </Select>
//               </div>
//             }
//           >
//             <ResponsiveContainer width="100%" minWidth={500} height={350}>
//               <ComposedChart
//                 margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
//                 data={mainChartData}
//               >
//                 <YAxis
//                   ticks={[0, 2500, 5000, 7500]}
//                   tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
//                   stroke={theme.palette.text.hint + "80"}
//                   tickLine={false}
//                 />
//                 <XAxis
//                   tickFormatter={i => i + 1}
//                   tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
//                   stroke={theme.palette.text.hint + "80"}
//                   tickLine={false}
//                 />
//                 <Area
//                   type="natural"
//                   dataKey="desktop"
//                   fill={theme.palette.background.light}
//                   strokeWidth={0}
//                   activeDot={false}
//                 />
//                 <Line
//                   type="natural"
//                   dataKey="mobile"
//                   stroke={theme.palette.primary.main}
//                   strokeWidth={2}
//                   dot={false}
//                   activeDot={false}
//                 />
//                 <Line
//                   type="linear"
//                   dataKey="tablet"
//                   stroke={theme.palette.warning.main}
//                   strokeWidth={2}
//                   dot={{
//                     stroke: theme.palette.warning.dark,
//                     strokeWidth: 2,
//                     fill: theme.palette.warning.main,
//                   }}
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Widget>
//         </Grid>
        
//         {/* {mock.bigStat.map(stat => (
//           <Grid item md={4} sm={6} xs={12} key={stat.product}>
//             <BigStat {...stat} />
//           </Grid>
//         ))} */}

//         <Grid item xs={6}>
//           <MUIDataTable
//               title="Top News Publisher"
//               data={topnews}
//               columns={["Name", "Newscount"]}
//               options={{
//                 filter: false,
//                 download:false,
//                 print:false
//               }}
//             />
//         </Grid>

//         <Grid item xs={6}>
//           <MUIDataTable
//             title="Recently Added User"
//             data={datatableData}
//             columns={["Name", "Email", "gender"]}
            
//           />
//         </Grid>

//       </Grid>
//     </>
//   );
// }

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount:0, 
    }

    //this.likecount = this.likecount.bind(this);
    
  }
  componentDidMount(){
    const likes = [
          { group: { objectId: null, total: { $sum: '$likeCount' } } }
        ];
        let ex = new Parse.Query("Post");
        ex.aggregate(likes)
          .then(function(results) {
             console.log(results[0].total);
             const total = results[0].total;
             this.setState({ likeCount: total})
          })
          .catch(function(error) {
            console.log(error);
          });    
    
  }

  // likecount = () => {
  //   const likes = [
  //     { group: { objectId: null, total: { $sum: '$likeCount' } } }
  //   ];
  //   let ex = new Parse.Query("Post");
  //   ex.aggregate(likes)
  //     .then(function(results) {
  //        console.log(results[0].total);
  //        const total = results[0].total;
  //         this.setState({
  //           likeCount:total
  //         });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  //   }
  render() {
    let likeTotal = this.state.likeCount;
    
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
                100
          </Widget>
        </Grid>

        <Grid item xs={3}>
          <Widget
                title="Total Like"
                upperTitle
                //bodyClass={classes.fullHeightBody}
                //className={classes.card}
              >
                
              
                {likeTotal}
          </Widget>
        </Grid>

        <Grid item xs={3}>
          <Widget
                title="Total Dislike"
                upperTitle
                //bodyClass={classes.fullHeightBody}
                //className={classes.card}
              >
                100
          </Widget>
        </Grid>

        <Grid item xs={3}>
          <Widget
                title="Total Comment"
                upperTitle
                //bodyClass={classes.fullHeightBody}
                //className={classes.card}
              >
                100
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

