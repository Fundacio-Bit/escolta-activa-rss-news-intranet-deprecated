/* eslint-disable no-prototype-builtins */
// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import NewsTableRow from './news-table-row'
import NewsTableHead from './news-table-head'
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'
import RSSSnackbarContent from './rss-snackbar-content'
import CircularProgress from '@material-ui/core/CircularProgress'

import ErrorIcon from '@material-ui/icons/Error'
import { baseErrorMessage, getErrorMessage } from './utils/getErrorMessage.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  input: {
    display: 'none',
  },
  error: {
    marginTop: theme.spacing(1),
    color: '#e91e63'
  },
  loading: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  }
}));


var desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};


var getSorting = (orderBy, order) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

export const NewsTable = (props) => {

  const classes  = useStyles();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('published');
  const [data, setData] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({error: false, message: ''});
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now())

  const all = [5,10,25,50];
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  function filterByDate(pressNew) {
    var dateFrom = props.selectedDateFrom.split("-");
    var dateTo = props.selectedDateTo.split("-");

    var from = new Date(dateFrom[0], parseInt(dateFrom[1])-1, dateFrom[2]);  // -1 because months are from 0 to 11
    var to   = new Date(dateTo[0], parseInt(dateTo[1])-1, dateTo[2]);

    if (pressNew.hasOwnProperty("published"))
    {
      var published = new Date(pressNew.published)
      if (published >= from && published <= to){
        return true
      } else return false
    }
  };

  function filterByCountry(pressNew) {
    if (pressNew.hasOwnProperty("source_id") && pressNew.source_id.includes(props.selectedCountry)) {
      return true
    } else return false
  };
  
  function filterByChecked (pressNew) {   

    if (props.isChecked === 1 && pressNew.hasOwnProperty("topics")) return true
    else if (props.isChecked === -1 && !pressNew.hasOwnProperty("topics")) return true
    else if (props.isChecked === 0) return true
    else return false
  };

  function filterByTopic(pressNew) {
    if (
      pressNew.hasOwnProperty("topics") && pressNew.topics.toLowerCase().split(",").includes(props.searchTerm.toLowerCase())){
        return true
      }
    else return false
  };

// Funciona la búsqueda por término si antes haces una por topic

  // TODO: add search in full text
  function filterBySearchTerm(pressNew) {
    if (
      pressNew.hasOwnProperty("title") && pressNew.title.toLowerCase().indexOf(props.searchTerm.toLowerCase())!== -1){
        return true
      }
    else return false
  };

  // Filtering data
  let filteredData = data.slice();

  if (props.selectedDateFrom) {
    filteredData = filteredData.filter(filterByDate);
  } 
  if (props.selectedDateTo) {
    filteredData = filteredData.filter(filterByDate);
  } 
  if (props.isChecked) {
    filteredData = filteredData.filter(filterByChecked);
    console.log('time to filter') 
  }
  if (props.selectedCountry) {
    if (props.selectedCountry != 'Tots') {
      filteredData = filteredData.filter(filterByCountry);
      console.log('time to filter')  
    }
  } 
  if (props.searchType === 0){
    filteredData = filteredData.filter(filterBySearchTerm);
  }
  else if (props.searchType === 1 && props.searchTerm !== ""){
    filteredData = filteredData.filter(filterByTopic);
  }

  // Sorting data
  filteredData.sort(getSorting(orderBy, order));

  // The unmounted flag is used to avoid that setData, set Loading and setErrorStatus are executed after
  // the component has been unmounted.
  // The use effect returns the unmounted flag set to true, this return is the so called cleanup function of
  // useEffect which is used equivalently to the componentWillUnmount function of React Class Components.
  // This cleanup is necessary to keep consistency, it is not possible to set a state of an unmounted component.
  // Although the application could not crash in that case it would launch some warnings because the app performance
  // could be compromised  
  // A more detailed explanation can be found at (section ABORT DATA FETCHING IN EFFECT HOOK):
  // https://www.robinwieruch.de/react-hooks-fetch-data

  // The empty array provided at the end of the use effect function determines that this useEffect will be only 
  // execute once, when the component is mounted. Subsequent updates (due to rerenders) will no trigger the execution
  // again.
  // This empty array can contain variables. If one of the variables in the array changes it values between updates
  // the useEffect hook will be executed again.
  // Further info at (section Tip: Optimizing Performance by Skipping Effects):
  // https://en.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

  // useEffect has been defined twice for separate API calls, one to retrieve data, another to retrieve Topics.
  // such repetition of useEffect definition is allowed by REACT and useful to separate concersn, for code clarity.
  // Further info at:
  // https://en.reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
  

  // First useEffect. Retrieves the entries array.
  // Executes on mounting and each time that "lastUpdateTimestamp" changes.
  // The lastUpdateTimestamp state is used to trigger rerenders each time the list of data changes because of
  // user mediated row edits, insertions or deletes.
  // Once the data have been updated in mongo a setLastUpdateTimestamp with the timestamp at that moment will
  // relaunch the useEfect as determined by its dependencies, thereby the whole updated data list will be retrieved
  // again.
  useEffect(() => {   
    
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({error: false, message: ''});
        // setLoading(true);
      }

      try {
        axios.get(`/rss-news/entries/starting-date/${props.selectedDateFrom}/ending-date/${props.selectedDateTo}`).then((results) => { 
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
            // Error
            if (!unmounted) {
              console.log(getErrorMessage(results));
              setErrorStatus( { error: true, message: baseErrorMessage } );
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
    // It is equivalent to the componentWillUnmount function of class components.
    // Here it is used to avoid the execution of setData on unmounted components.
    // Further info at:
    // https://en.reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => unmounted = true;

  }, [lastUpdateTimestamp, props.selectedDateFrom, props.selectedDateTo]);

  // Second useEffect. To retrieve the topics array. Executes on mounting and each time that "allTopics" changes.
  useEffect(() => {
    
    let unmounted = false;

    const fetchData = () => {
      // if (!unmounted) {
      //   setErrorStatus({error: false, message: ''});
      //   setLoading(true);
      // }

      try {
        axios.get('/rss-topics/topics').then((results) => {               
          if (results.data.results.length > 0) {            
            // OK
            setTimeout(() => {
              if (!unmounted) {
                setErrorStatus({error: false, message: ''});
                // setLoading(false);
                setAllTopics(results.data.results);
              }
            }, 850);
          }
          else {
            // Error
            if (!unmounted) {
              console.log(getErrorMessage(results));
              setErrorStatus( { error: true, message: baseErrorMessage } );
              // setLoading(false);
            }
          }
        }).catch(error => {
          console.log(getErrorMessage(error));
          setErrorStatus( { error: true, message: baseErrorMessage } );
          // setLoading(false);
        }); 

      } catch (error) {
        if (!unmounted) {          
          console.error(error);
          setErrorStatus( { error: true, message: baseErrorMessage } );
          // setLoading(false);
        }
      }
    }

    fetchData();
    
    // Cleanup function. Here it is used to avoid the execution of setAllTopics on unmounted components.
    return () => unmounted = true;
  }, [lastUpdateTimestamp, props.selectedDateFrom, props.selectedDateTo]);

  // TODO: handle the addition of topics with special chars or commas. Also avoid duplicates.
  function handleUpdateTopics(id, topicsString) {
    let retrievedNews = data;
    const index = retrievedNews.findIndex(x => x._id == id);
    var processedTopicsString = topicsString == "" ? "%20" : topicsString.toString().toLowerCase();

    // TODO: update via POST instead of via put to avoid problems with long URLS and with special chars
    axios.put('/rss-news/identifier/'+ id +'/topics/' + processedTopicsString )
    .then((res) => {
        retrievedNews[index].topics = processedTopicsString == "%20" ? "": processedTopicsString;
        // Update the state after response
        // We have used an "update timestamp" to trigger rerenders
        setLastUpdateTimestamp(Date.now())
    })
  }


  function handleRequestSort(orderByReq, order) {
    console.log(orderByReq);
    console.log(order);
    let newOrder = 'desc';

    if (orderBy === orderByReq && order === 'desc') { newOrder = 'asc' };

    setOrder(newOrder);
    setOrderBy(orderByReq);
  };


  function handleChangePage(event, page) {
    setPage(page);
  };

  function handleChangeRowsPerPage(event) { setRowsPerPage(event.target.value) };

  function  handleDeleteClick(id) {
    const retrievedNews = data;
    const index = retrievedNews.findIndex(x => x._id == id);
    const removed_new = retrievedNews[index]

    axios.post('/rss-discarded-news/news-discarded/', 
                removed_new, 
                {headers: {'Content-Type': 'application/json' }}
    ).then((res) => {
        axios.delete('/rss-news/identifier/'+ id)
        .then((res) => {
            // Update the state after response
            // We have used an "update timestamp" to trigger rerenders
            setLastUpdateTimestamp(Date.now())
        })  
    })
  }

  // Sorting data
  filteredData.sort(getSorting(orderBy, order));

  return (
    <div>
      {errorStatus.error &&
        <div className={classes.error}>
          &nbsp;<ErrorIcon style={{verticalAlign: 'middle'}}/>&nbsp;{errorStatus.message}
        </div>}

      {loading &&
        <div className={classes.loading}>
          <CircularProgress size={24} thickness={4} />
        </div>
      }

      {!loading && !errorStatus.error &&
        <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            {data.length > 0 && (
              <NewsTableHead
                order = { order }
                orderBy = { orderBy }
                onRequestSort = { handleRequestSort }
              />
            )}
            <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => {
              return (                    
                <NewsTableRow
                //TODO:check what are keys for. They should be unique and cannot be rendered in the DOM
                // using prop.key
                  key={ u._id }
                  published={ u.published }
                  docId={ u._id }
                  title={ u.title }
                  topics={ u.hasOwnProperty("topics") && u.topics != ""? u.topics.split(",") : [] }
                  allPossibleTopics= { allTopics }
                  source_id={ u.source_id }
                  source_name={ u.source_name }
                  section={ u.section }
                  brand={ u.brand }
                  link={ u.link }
                  summary={ u.summary }
                  handleDeleteClick = { handleDeleteClick }
                  handleUpdateTopics = { handleUpdateTopics }
                  isUpdating = { false }
                />
              );
            })} 
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <RSSSnackbarContent
                    variant="info"
                    className={classes.margin}
                    message="No hi ha dades per a aquesta cerca!"
                  />
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
            </TableBody>
          </Table>
        </div>
        {filteredData.length > 0 && (
          <TablePagination
            component="div"
            count={ filteredData.length }
            rowsPerPage={ rowsPerPage }
            page={ page }
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={ handleChangePage }
            onChangeRowsPerPage={ handleChangeRowsPerPage }
            rowsPerPageOptions={ all }
          />
        )}
      </Paper>
      }
    </div>    
  );
}
