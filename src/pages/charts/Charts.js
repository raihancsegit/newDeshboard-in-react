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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';



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
  
  const [janLike,janSetLike] = useState(0);
  const [janDislike,janSetDislike] = useState(0);
  const [janComment,janSetComment] = useState(0);
  const [janShare,janSetShare] = useState(0);

  const [febLike,febSetLike] = useState(0);
  const [febDislike,febSetDislike] = useState(0);
  const [febComment,febSetComment] = useState(0);
  const [febShare,febSetShare] = useState(0);

  const [marLike,marSetLike] = useState(0);
  const [marDislike,marSetDislike] = useState(0);
  const [marComment,marSetComment] = useState(0);
  const [marShare,marSetShare] = useState(0);

  const [aprLike,aprSetLike] = useState(0);
  const [aprDislike,aprSetDislike] = useState(0);
  const [aprComment,aprSetComment] = useState(0);
  const [aprShare,aprSetShare] = useState(0);

  const [mayLike,maySetLike] = useState(0);
  const [mayDislike,maySetDislike] = useState(0);
  const [mayComment,maySetComment] = useState(0);
  const [mayShare,maySetShare] = useState(0);

  const [junLike,junSetLike] = useState(0);
  const [junDislike,junSetDislike] = useState(0);
  const [junComment,junSetComment] = useState(0);
  const [junShare,junSetShare] = useState(0);

  const [julLike,julSetLike] = useState(0);
  const [julDislike,julSetDislike] = useState(0);
  const [julComment,julSetComment] = useState(0);
  const [julShare,julSetShare] = useState(0);

  const [augLike,augSetLike] = useState(0);
  const [augDislike,augSetDislike] = useState(0);
  const [augComment,augSetComment] = useState(0);
  const [augShare,augSetShare] = useState(0);

  const [sepLike,sepSetLike] = useState(0);
  const [sepDislike,sepSetDislike] = useState(0);
  const [sepComment,sepSetComment] = useState(0);
  const [sepShare,sepSetShare] = useState(0);

  const [octLike,octSetLike] = useState(0);
  const [octDislike,octSetDislike] = useState(0);
  const [octComment,octSetComment] = useState(0);
  const [octShare,octSetShare] = useState(0);

  const [novLike,novSetLike] = useState(0);
  const [novDislike,novSetDislike] = useState(0);
  const [novComment,novSetComment] = useState(0);
  const [novShare,novSetShare] = useState(0);

  const [decLike,decSetLike] = useState(0);
  const [decDislike,decSetDislike] = useState(0);
  const [decComment,decSetComment] = useState(0);
  const [decShare,decSetShare] = useState(0);

  useEffect(() => {
    //Update the document title using the browser API
    const MyCustomClass = Parse.Object.extend('Post');
    const query = new Parse.Query(MyCustomClass);
    
    query.find().then((results) => {
      
     const FeedsJeson = JSON.stringify(results);
     const Feeds = JSON.parse(FeedsJeson);
     const filteredData =  Feeds.filter((data,i) => {

        var pDate = new Date(data.createdAt)
        var cDate = new Date()
        var Month = cDate.getMonth();
        //alert(Month);
        const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
        //console.log(dataFormate)
        let ex = new Parse.Query("Post");

        if(Month === 0){

          if(dataFormate < 29 ){
            const janlikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];

            const jandisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];

            const janComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const janShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];

            

            ex.aggregate(janlikes)
            .then(function(results) {
              console.log(results[0].total);
              //  const total = results[0].total;
              janSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(jandisLikes)
            .then(function(results) {
              janSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(janComment)
            .then(function(results) {
              janSetComment(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(janShare)
            .then(function(results) {
              janSetShare(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

          }
        }

        if(Month === 1){
          if(dataFormate < 29 ){
            const feblikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const febdisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const febComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const febShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];

            ex.aggregate(feblikes)
            .then(function(results) {
              febSetLike(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });

            ex.aggregate(febdisLikes)
            .then(function(results) {
              febSetDislike(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });

            ex.aggregate(febComment)
            .then(function(results) {
              febSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });

            ex.aggregate(febShare)
            .then(function(results) {
              febSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 2){
          if(dataFormate < 29 ){
            const marLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const marDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const marComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const marShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];

            ex.aggregate(marLikes)
            .then(function(results) {
              //console.log(results[0].total);
              marSetLike(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });

            ex.aggregate(marDisLikes)
            .then(function(results) {
              marSetDislike(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });

            ex.aggregate(marComment)
            .then(function(results) {
              marSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });

            ex.aggregate(marShare)
            .then(function(results) {
              marSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });

          }
        }

        if(Month === 3){
          if(dataFormate < 29 ){
            const aprLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const aprDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const aprComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const aprShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(aprLikes)
            .then(function(results) {
              //console.log(results[0].total);
              aprSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(aprDisLikes)
            .then(function(results) {
              aprSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(aprComment)
            .then(function(results) {
              aprSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(aprShare)
            .then(function(results) {
              aprSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 4){
          if(dataFormate < 29 ){
            const mayLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const mayDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const mayComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const mayShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(mayLikes)
            .then(function(results) {
              //console.log(results[0].total);
              maySetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(mayDisLikes)
            .then(function(results) {
              maySetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(mayComment)
            .then(function(results) {
              maySetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(mayShare)
            .then(function(results) {
             maySetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 5){
          if(dataFormate < 29 ){
            const junLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const junDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const junComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const junShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(junLikes)
            .then(function(results) {
              //console.log(results[0].total);
              junSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(junDisLikes)
            .then(function(results) {
              junSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(junComment)
            .then(function(results) {
              junSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(junShare)
            .then(function(results) {
              junSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 6){
          if(dataFormate < 29 ){
            const julLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const julDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const julComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const julShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(julLikes)
            .then(function(results) {
              //console.log(results[0].total);
              julSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(julDisLikes)
            .then(function(results) {
              julSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(julComment)
            .then(function(results) {
              julSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(julShare)
            .then(function(results) {
              julSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 7){
          if(dataFormate < 29 ){
            const augLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const augDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const augComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const augShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(augLikes)
            .then(function(results) {
              //console.log(results[0].total);
              augSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(augDisLikes)
            .then(function(results) {
              augSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(augComment)
            .then(function(results) {
              augSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(augShare)
            .then(function(results) {
              augSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 8){
          if(dataFormate < 29 ){
            const sepLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const sepDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const sepComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const sepShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(sepLikes)
            .then(function(results) {
              //console.log(results[0].total);
              sepSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(sepDisLikes)
            .then(function(results) {
              sepSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(sepComment)
            .then(function(results) {
              sepSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(sepShare)
            .then(function(results) {
              sepSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 9){
          if(dataFormate < 29 ){
            const octLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const octDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const octComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const octShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(octLikes)
            .then(function(results) {
              //console.log(results[0].total);
              octSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(octDisLikes)
            .then(function(results) {
              octSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(octComment)
            .then(function(results) {
              octSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(octShare)
            .then(function(results) {
              octSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 10){
          if(dataFormate < 29 ){
            const novLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const novDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const novComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const novShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(novLikes)
            .then(function(results) {
              //console.log(results[0].total);
              novSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(novDisLikes)
            .then(function(results) {
              novSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(novComment)
            .then(function(results) {
              novSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(novShare)
            .then(function(results) {
              novSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }

        if(Month === 11){
          if(dataFormate < 29 ){
            const decLikes = [
              { group: { objectId: null, total: { $sum: '$likeCount' } } }
            ];
            const decDisLikes = [
              { group: { objectId: null, total: { $sum: '$dislikeCount' } } }
            ];
            const decComment = [
              { group: { objectId: null, total: { $sum: '$commentCount' } } }
            ];

            const decShare = [
              { group: { objectId: null, total: { $sum: '$shareCount' } } }
            ];
            ex.aggregate(decLikes)
            .then(function(results) {
              //console.log(results[0].total);
              decSetLike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });

            ex.aggregate(decDisLikes)
            .then(function(results) {
              decSetDislike(results[0].total);
            })
            .catch(function(error) {
              console.log(error);
            });
            ex.aggregate(decComment)
            .then(function(results) {
              decSetComment(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
            ex.aggregate(decShare)
            .then(function(results) {
              decSetShare(results[0].total);
            })
            .catch(function(error) {
              //console.log(error);
            });
          }
        }



    });

    
    });

    
    
  },[]);
  //document.title = `You clicked ${like} times`;
   

  const lineChartData = [
    {
      name: "January",
      Like: janLike,
      Dislike: janDislike,
      Comment:janComment,
      Share:janShare,
      amt: 2400,
      
    },
    {
      name: "February",
      Like: febLike,
      Dislike: febDislike,
      Comment:febComment,
      Share:febShare,
      amt: 2210,
      
    },
    {
      name: "March",
      Like: marLike,
      Dislike: marDislike,
      Comment:marComment,
      Share:marShare,
      amt: 2290,
      
    },
    {
      name: "April",
      Like: aprLike,
      Dislike: aprDislike,
      Comment:aprComment,
      Share:aprShare,
      amt: 2000,
    },
    {
      name: "May",
      Like: mayLike,
      Dislike: mayDislike,
      Comment:mayComment,
      Share:mayShare,
      amt: 2181,
    },
    {
      name: "June",
      Like: junLike,
      Dislike: junDislike,
      Comment:junComment,
      Share:junShare,
      amt: 2500,
    },
    {
      name: "July",
      Like: julLike,
      Dislike: julDislike,
      Comment:julComment,
      Share:julShare,
      amt: 2100,
    },
    {
      name: "Aguast",
      Like: augLike,
      Dislike: augDislike,
      Comment:augComment,
      Share:augShare,
      amt: 2100,
    },
    {
      name: "September",
      Like: sepLike,
      Dislike: sepDislike,
      Comment:sepComment,
      Share:sepShare,
      amt: 2100,
    },
    {
      name: "Octobar",
      Like: octLike,
      Dislike: octDislike,
      Comment:octComment,
      Share:octShare,
      amt: 2100,
    },
    {
      name: "November",
      Like: novLike,
      Dislike: novDislike,
      Comment:novComment,
      Share:novShare,
      amt: 2100,
    },
    {
      name: "December",
      Like: decLike,
      Dislike: decDislike,
      Comment:decComment,
      Share:decShare,
      amt: 2100,
    },
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
   
    const MyCustomClass = Parse.Object.extend('PostAction');
    const query = new Parse.Query(MyCustomClass);
    query.equalTo("type", "like");
    query.find().then((results) => {
      const FeedsJeson = JSON.stringify(results);
      const Feeds = JSON.parse(FeedsJeson);
      const likeCount = Feeds.filter((data,i) => {
        var pDate = new Date(data.createdAt);
        var cDate = new Date();
        var Month = cDate.getMonth();
        //alert(Month);
        if(Month === 2){
          const dataFormate = Math.floor((cDate - pDate) / (1000*60*60*24));
          console.log("Date Formate "+dataFormate);

            if(value === 'seven'){
              if(dataFormate < 1 ){
                console.log("item "+ data.createdAt);
                query.count().then(count => {
                //if (typeof document !== 'undefined') document.write(`ParseObjects found: ${count}`);
                  //console.log(`ParseObjects found: ${count}`);
                  janSetLike(count);
        
                });
              }
            }

            if(value === 'fifthen'){
              if(dataFormate < 15 ){
                console.log("item "+ data.createdAt);
                query.count().then(count => {
                //if (typeof document !== 'undefined') document.write(`ParseObjects found: ${count}`);
                  //console.log(`ParseObjects found: ${count}`);
                  janSetLike(count);
        
                });
              }
            }

            
            
        }
        
        
      })

      // query.count().then(count => {
      //   //if (typeof document !== 'undefined') document.write(`ParseObjects found: ${count}`);
      //   console.log(`ParseObjects found: ${count}`);
       
      // });
      
    })
    
    
  }

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

              <FormControl style={{ textAlign:'right',display:'block',marginTop:'-42px',marginBottom:'24px',marginRight:'50px' }}>
                  <NativeSelect
                    //value={state.age}
                    onChange={((e) => handleChange(e))}
                    name="age"
                    //className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'age' }}
                  >
                    <option value="">Posted On</option>
                    <option value="seven">Last 7 days</option>
                    <option value="fifthen">Last 15 days</option>
                    
                  </NativeSelect>
              </FormControl>

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

                 <Line 
                  type="monotone"
                  dataKey="Comment"
                  stroke="red"
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone"
                  dataKey="Share"
                  stroke="black"
                  activeDot={{ r: 8 }}
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
