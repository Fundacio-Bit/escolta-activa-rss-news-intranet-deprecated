/* eslint-disable no-prototype-builtins */
// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress'

import ErrorIcon from '@material-ui/icons/Error'
import { baseErrorMessage, getErrorMessage } from './utils/getErrorMessage.js'
import { makeStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
// import { FixedSizeList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer'
import { List, AutoSizer } from "react-virtualized";


const useStyles = makeStyles(theme => ({
  root: {
    // height: '100vmax',
    paddingTop: 30,
    paddingBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    // minWidth: '20%',
    // maxWidth: '35%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rank1: {
    fontSize: 50,
    textAlign: 'left',
  },
  topTopic: {
    fontSize: 50,
    textAlign: 'left',
  },
  error: {
    marginTop: theme.spacing(1),
    color: '#e91e63'
  },
  loading: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));

export const TopicsRanking = (props) => {

  const classes  = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({error: false, message: ''});

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

  
  // Calculate the topics array and counts.
  useEffect(() => {   
    
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({error: false, message: ''});
        setLoading(true);
      }
      try {
        axios.get(`/rss-news/entries/yearmonth/${props.selectedMonth}`).then((results) => { 
          if (results.data.results.length > 0) { 
            // OK
            setTimeout(() => {
              if (!unmounted) {
                setErrorStatus({error: false, message: ''});
                setLoading(false);
                const newsWithTopicsArray = results.data.results.filter( item => item.hasOwnProperty('topics') );
                const topicsStringsArray = newsWithTopicsArray.map( item => item.topics );
                const allMonthTopicsArray = topicsStringsArray.join(',').split(',');
                let topicsObject = {};
                allMonthTopicsArray.forEach(topic => {
                  if (topicsObject.hasOwnProperty(topic)){
                    topicsObject[topic] = topicsObject[topic] + 1
                    }
                  else{
                    topicsObject[topic] = 1
                  }
                })
              
                const topicCountsObjectsArray = Object.entries(topicsObject).map( topicsCount => {
                  return { 'name': topicsCount[0], 'count': topicsCount[1]}
                })
                setData(topicCountsObjectsArray);
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

    // Cleanup function. 
    return () => unmounted = true;

  }, [props.selectedMonth]);

// <List height={height} width={width} itemSize={46} itemCount={data.length}>
//   {renderTopic}
// </List>
  return (
    <div className={classes.root}>
      { data.length > 0 &&
      // https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md#why-is-my-autosizer-setting-a-height-of-0
      <AutoSizer disableHeight>
        {({width}) => (
          <List height={data.length * 46} width={width} rowHeight={46} rowCount={data.length} rowRenderer= {renderTopic} overscanRowCount={3}/>
          )
        }
      </AutoSizer>}
    </div>
  );
}



  // https://material-ui.com/es/components/avatars/
  // https://material-ui.com/es/components/chips/
  // https://material-ui.com/es/components/lists/
  // https://material-ui.com/es/components/typography/
  // https://material-ui.com/es/customization/typography/





// {!loading && !errorStatus.error &&
//   <Paper className={classes.root}>
//   <div className={classes.tableWrapper}>
//   <Table className={classes.table} aria-labelledby="tableTitle">
//       {filteredData.length > 0 && (
//         <TopicsTableHead
//           order = { order }
//           orderBy = { orderBy }
//         />
//       )}
//       <TableBody>
//       {filteredData.length > 0 && filteredData.map(u => {
//         return (                    
//           <TopicsTableRow
//             key= { u.name }
//             topic = { u.name }
//             count = { u.count }
//           />
//         );
//       })} 
//       {filteredData.length === 0 && (
//         <TableRow>
//           <TableCell colSpan={4}>
//             <RSSSnackbarContent
//               variant="info"
//               className={classes.margin}
//               message="No hi ha dades per a aquesta cerca!"
//             />
//           </TableCell>
//         </TableRow>
//       )}
//       </TableBody>
//     </Table>          
//   </div>
// </Paper>
// }

