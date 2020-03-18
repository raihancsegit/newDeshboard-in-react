import React, { useState, useEffect } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import moment from "moment";

const pieChartData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

var Parse = require("parse/node");
export default function Charts(props) {
  var theme = useTheme();
  // local
  var [activeIndex, setActiveIndexId] = useState(0);

  const [defailtFilterValue, setFiltervalue] = useState(7);

  const [sevenLine, setSevenLine] = useState([]);

  console.log({ sevenLine });

  

  useEffect(() => {
    //handleChange();

    let selectedDays = {};
    for (let i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      selectedDays[`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`] = {
        name: d,
        like: 0,
        dislike: 0,
        bookmark: 0,
        share: 0,
      };
    }

    //console.log({ initValue: selectedDays });

    const MyCustomClass = Parse.Object.extend("PostAction");
    const query = new Parse.Query(MyCustomClass);
    //query.equalTo("type", "like");
    query.find().then(results => {
      const FeedsJeson = JSON.stringify(results);

      const Feeds = JSON.parse(FeedsJeson).map(item => {
        return { ...item, count: 1, Type: item.type };
      });

      Feeds.forEach(item => {
        // get the post date
        let actionDate = new Date(item.createdAt);

        if (
          selectedDays[
            `${actionDate.getDate()}-${actionDate.getMonth()}-${actionDate.getFullYear()}`
          ]
        ) {
          selectedDays[
            `${actionDate.getDate()}-${actionDate.getMonth()}-${actionDate.getFullYear()}`
          ][item.type] =
            selectedDays[
              `${actionDate.getDate()}-${actionDate.getMonth()}-${actionDate.getFullYear()}`
            ][item.type] + 1;
        }
      });

      const UniqueFeeds = [];
      const UniqueFeedIds = [];

      Feeds.forEach(item => {
        if (UniqueFeedIds.indexOf(item.Type) === -1) {
          UniqueFeedIds.push(item.Type);
          UniqueFeeds.push(item);
        } else {
          const postIndex = UniqueFeeds.findIndex(
            post => item.Type == post.Type,
          );
          const updatedFeed = UniqueFeeds[postIndex];

          updatedFeed["count"] = updatedFeed["count"] + 1;

          UniqueFeeds[postIndex] = updatedFeed;
        }
      });

      // console.log({
      //   Feeds,
      //   UniqueFeeds,
      // });
      setFiltervalue(setSevenLine([]));
      setFiltervalue(
        setSevenLine(
          Object.values(selectedDays).map(item => {
            return { ...item, name: moment(item.name).format("MMM Do") };
          }),
        ),
      );
    });
  },[]);

  const handleChange = e => {
    //console.log(e.target.value);
    // if(e){
    //   const value = e.target.value;
    // }

    let selectedDays = {};
    for (let i = 0; i < e.target.value; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      selectedDays[`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`] = {
        name: d,
        like: 0,
        dislike: 0,
        bookmark: 0,
        share: 0,
      };
    }

    //console.log({ initValue: selectedDays });

    const MyCustomClass = Parse.Object.extend("PostAction");
    const query = new Parse.Query(MyCustomClass);
    //query.equalTo("type", "like");
    query.find().then(results => {
      const FeedsJeson = JSON.stringify(results);

      const Feeds = JSON.parse(FeedsJeson).map(item => {
        return { ...item, count: 1, Type: item.type };
      });

      Feeds.forEach(item => {
        // get the post date
        let actionDate = new Date(item.createdAt);

        if (
          selectedDays[
            `${actionDate.getDate()}-${actionDate.getMonth()}-${actionDate.getFullYear()}`
          ]
        ) {
          selectedDays[
            `${actionDate.getDate()}-${actionDate.getMonth()}-${actionDate.getFullYear()}`
          ][item.type] =
            selectedDays[
              `${actionDate.getDate()}-${actionDate.getMonth()}-${actionDate.getFullYear()}`
            ][item.type] + 1;
        }
      });

      const UniqueFeeds = [];
      const UniqueFeedIds = [];

      Feeds.forEach(item => {
        if (UniqueFeedIds.indexOf(item.Type) === -1) {
          UniqueFeedIds.push(item.Type);
          UniqueFeeds.push(item);
        } else {
          const postIndex = UniqueFeeds.findIndex(
            post => item.Type == post.Type,
          );
          const updatedFeed = UniqueFeeds[postIndex];

          updatedFeed["count"] = updatedFeed["count"] + 1;

          UniqueFeeds[postIndex] = updatedFeed;
        }
      });

      console.log({
        Feeds,
        UniqueFeeds,
      });

      // var timeFrom = X => {
      //   var dates = [];

      //   for (let I = 0; I < Math.abs(X); I++) {
      //     var formated = moment(
      //       new Date(
      //         new Date().getTime() -
      //           (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000,
      //       ).toLocaleString(),
      //     ).format("MMM Do");

      //     dates.push({
      //       name: formated,
      //       Like: 0,
      //       Dislike: 0,
      //       Comment: 2,
      //       Share: 1,
      //     });
      //   }

      //   console.log({ dates });
      //   return dates;
      // };

      //console.log(timeFrom(-7)); // Future 7 Days
      //console.log(timeFrom(7)); // Past 7 Days

      setFiltervalue(setSevenLine([]));
      setFiltervalue(
        setSevenLine(
          Object.values(selectedDays).map(item => {
            return { ...item, name: moment(item.name).format("MMM Do") };
          }),
        ),
      );
    });
  
    
  };

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
        <Widget title="User Activity Chart" noBodyPadding upperTitle>
          <FormControl
            style={{
              textAlign: "right",
              display: "block",
              marginTop: "-42px",
              marginBottom: "24px",
              marginRight: "50px",
            }}

          >
            <NativeSelect
              value={defailtFilterValue}
              onChange={e => handleChange(e)}
              name="age"
              //className={classes.selectEmpty}
              inputProps={{ "aria-label": "age" }}
            >
              <option value={7}>Last 7 days</option>
              <option value={15}>Last 15 days</option>
              <option value={30}>Last 30 days</option>
            </NativeSelect>
          </FormControl>

          <ResponsiveContainer width="100%" height={350}>
            {sevenLine.length ? (
              <LineChart
                width={500}
                height={300}
                data={sevenLine}
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
                  dataKey="like"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="dislike"
                  stroke={theme.palette.secondary.main}
                />

                <Line
                  type="monotone"
                  dataKey="bookmark"
                  stroke="red"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="share"
                  stroke="black"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            ) : (
              <p></p>
            )}
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
