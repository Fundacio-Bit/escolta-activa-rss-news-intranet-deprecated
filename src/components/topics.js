import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TopicsRanking } from './topics-ranking';
import { TopicsNews } from './topics-news';
import TopicsSearchAppBar from './topics-search-app-bar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { baseErrorMessage, getErrorMessage } from './utils/getErrorMessage.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // width: '100%',
    // height: '100%',
  },
  paper: {
    // padding: theme.spacing(y) * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },  
}));

export const Topics = (props) => {

  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var year_month_str = yyyy + '-' + mm


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({error: false, message: ''});
  const [selectedMonth, setSelectedMonth] = useState(year_month_str);

  const classes  = useStyles();

  function renderTopic(props) {
    const { index, style } = props;
  
    return (      
      <ListItem button style={style} key={index}>
        <ListItemAvatar>
          <Avatar className={index > 3 ? classes.orange: classes.purple} >
            {index + 1}
          </Avatar>
      </ListItemAvatar>
        <ListItemText primary={`${data[index].name} ${data[index].count}`} />
      </ListItem>
    );
  }
  
  renderTopic.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };


  function filterByTopic(pressNew) {
    if (
      pressNew.hasOwnProperty("topics") && pressNew.topics.toLowerCase().split(",").includes(props.searchTerm.toLowerCase())){
        return true
      }
    else return false
  };

  let filteredData = data.slice()


  // Get the news related to a topic.
  useEffect(() => {   
  
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({error: false, message: ''});
        setLoading(true);
      }

      try {
        axios.get(`/rss-news/entries/yearmonth/${selectedMonth}`).then((results) => { 
          if (results.data.results.length > 0) { 
            // OK
            // Beware with this:
            // https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-event-handlers
            setTimeout(() => {
              if (!unmounted) {
                setErrorStatus({error: false, message: ''});
                setLoading(false);
                setData(results.data.results);
              }
            }, 850);
          }
          else {
            // No data returned
            if (!unmounted) {      
              setData([])
              setLoading(false);
            }
          }
        }).catch(error => {
          console.log(getErrorMessage(error));
          setErrorStatus( { error: true, message: baseErrorMessage } );
          setLoading(false);
        });   

      }
      catch (error) {
        if (!unmounted) {
          console.log(getErrorMessage(error));
          setErrorStatus( { error: true, message: baseErrorMessage } );
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function. useEffect uses the cleanup function to execute operations useful on component unmount.
    return () => unmounted = true;
  }, [selectedMonth]);

  return (
    <div className={classes.root}>
    <Grid container spacing={10}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TopicsSearchAppBar
              selectedMonth = {selectedMonth}
              onSelectMonth={setSelectedMonth}
            />
  
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <TopicsRanking selectedMonth = {selectedMonth}/>
        </Grid>
        <Grid item xs={8}>
          { data.length > 0 && data.map(u => {
                return (                    
                  <a href={u.link} className={classes.topicNew}  target="_blank"><h3>{u.title}</h3></a>
                );
              }
            )
          }; 
        </Grid>
      </Grid>
  </div>   
  );
}
