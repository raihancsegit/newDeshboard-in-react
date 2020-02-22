import React, { useState,useEffect  } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// components
import Widget from "../../components/Widget/Widget";
import ApexLineChart from "./components/ApexLineChart";
import ApexHeatmap from "./components/ApexHeatmap";
import PageTitle from "../../components/PageTitle/PageTitle";



const pieChartData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
var Parse = require('parse/node');
export default function Charts(props) {
  var theme = useTheme();
  // local
  var [activeIndex, setActiveIndexId] = useState(0);
  const [like,setLike] = useState(0);
  const [dislike,setDislike] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    // const MyCustomClass = Parse.Object.extend('Post');
    // const query = new Parse.Query(MyCustomClass);
    
    // query.find().then((results) => {
      
    //  const FeedsJeson = JSON.stringify(results);
    //  const Feeds = JSON.parse(FeedsJeson);
    //  const filteredData =  Feeds.filter((data,i) => {
    //     var pDate = new Date(data.createdAt)
    //     var cDate = new Date()
    //     var Month = cDate.getMonth();
    //     //alert(Month);
    //     const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
    //     //console.log(dataFormate)
    //     if(dataFormate < 29 ){
    //       const likes = [
    //         { group: { objectId: null, total: { $sum: '$likeCount' } } }
    //       ];
    //       let ex = new Parse.Query("Post");
    //       ex.aggregate(likes)
    //       .then(function(results) {
    //         console.log(results[0].total);
    //         //  const total = results[0].total;
    //          setLike(results[0].total);
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });

    //       return data;
    //     }
    // });

    
    

    // });

    
    
  });
  document.title = `You clicked ${like} times`;
  const lineChartData = [
    {
      name: "January",
      Like: like,
      Dislike: 2400,
      amt: 2400,
    },
    {
      name: "February",
      Like: 3000,
      Dislike: 1398,
      amt: 2210,
    },
    {
      name: "March",
      Like: 2000,
      Dislike: 9800,
      amt: 2290,
    },
    {
      name: "April",
      Like: 2780,
      Dislike: 3908,
      amt: 2000,
    },
    {
      name: "May",
      Like: 1890,
      Dislike: 4800,
      amt: 2181,
    },
    {
      name: "June",
      Like: 2390,
      Dislike: 3800,
      amt: 2500,
    },
    {
      name: "July",
      Like: 3490,
      Dislike: 4300,
      amt: 2100,
    },
    {
      name: "Aguast",
      Like: 3490,
      Dislike: 4300,
      amt: 2100,
    },
    {
      name: "September",
      Like: 3490,
      Dislike: 4300,
      amt: 2100,
    },
    {
      name: "Octobar",
      Like: 3490,
      Dislike: 4300,
      amt: 2100,
    },
    {
      name: "November",
      Like: 3490,
      Dislike: 4300,
      amt: 2100,
    },
    {
      name: "December",
      Like: 3490,
      Dislike: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      
        {/* <Grid item xs={12} md={6}>
          <Widget title="Apex Line Chart" upperTitle noBodyPadding>
            <ApexLineChart />
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Apex Heatmap" upperTitle noBodyPadding>
            <ApexHeatmap />
          </Widget>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <Widget title="Like Dislike Weekly Charts" noBodyPadding upperTitle>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Like"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Dislike"
                  stroke={theme.palette.secondary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Widget title="Pie Chart with Tooltips" noBodyPadding upperTitle>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart width={200} height={300}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={pieChartData}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill={theme.palette.primary.main}
                  dataKey="value"
                  onMouseEnter={(e, id) => setActiveIndexId(id)}
                />
              </PieChart>
            </ResponsiveContainer>
          </Widget>
        </Grid> */}
      
    </>
  );
}

// ################################################################

function renderActiveShape(props) {
  var RADIAN = Math.PI / 180;
  var {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  var sin = Math.sin(-RADIAN * midAngle);
  var cos = Math.cos(-RADIAN * midAngle);
  var sx = cx + (outerRadius + 10) * cos;
  var sy = cy + (outerRadius + 10) * sin;
  var mx = cx + (outerRadius + 30) * cos;
  var my = cy + (outerRadius + 30) * sin;
  var ex = mx + (cos >= 0 ? 1 : -1) * 22;
  var ey = my;
  var textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
}
