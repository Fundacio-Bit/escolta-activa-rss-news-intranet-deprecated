/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import DiscardedNewsTableRow from './discarded-news-table-row'
import DiscardedNewsTableHead from './discarded-news-table-head'
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

export const DiscardedNewsTable = (props) => {

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


  if (props.searchType === 0){
    filteredData = filteredData.filter(filterBySearchTerm);
  }
  else if (props.searchType === 1 && props.searchTerm !== ""){
    filteredData = filteredData.filter(filterByTopic);
  }

  // Sorting data
  filteredData.sort(getSorting(orderBy, order));
  
  // Retrieving the array of discarded news.
  useEffect(() => {
    
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({error: false, message: ''});
        setLoading(true);
      }

      try {
        axios.get(`/rss-discarded-news/entries/yearmonth/${props.selectedMonth}`).then((results) => { 
          if (results.data.results.length > 0) { 
            // OK
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

    // Cleanup function.
    return () => unmounted = true;

  }, [lastUpdateTimestamp, props.selectedMonth]);

  // Second useEffect. To retrieve the topics array. Executes on mounting and each time that "allTopics" changes.
  useEffect(() => {
    
    let unmounted = false;

    const fetchData = () => {

      try {
        axios.get('/rss-topics/topics').then((results) => {               
          if (results.data.results.length > 0) {            
            // OK
            setAllTopics(results.data.results);
          }
        }).catch(error => {
          console.log(getErrorMessage(error));
        }); 

      } catch (error) {
        if (!unmounted) {          
          console.error(error);
        }
      }
    }

    fetchData();
    
    // Cleanup function. Here it is used to avoid the execution of setAllTopics on unmounted components.
    return () => unmounted = true;
  }, [lastUpdateTimestamp]);

  function handleRequestSort(orderByReq, order) {
    let newOrder = 'desc';

    if (orderBy === orderByReq && order === 'desc') { newOrder = 'asc' };

    setOrder(newOrder);
    setOrderBy(orderByReq);
  };


  function handleChangePage(event, page) {
    setPage(page);
  };

  function handleChangeRowsPerPage(event) { setRowsPerPage(event.target.value) };

  function  handleRestoreClick(id) {
    const retrievedNews = data;
    const index = retrievedNews.findIndex(x => x._id == id);
    const discarded_new = retrievedNews[index]
    axios.post('/rss-news/news/', 
                discarded_new, 
                {headers: {'Content-Type': 'application/json' }}
    ).then((res) => {
        axios.delete('/rss-discarded-news/identifier/'+ id)
        .then((res) => {
            // Update the state after response
            // We have used an "update timestamp" to trigger rerenders
            setLastUpdateTimestamp(Date.now())
        })  
    })
  }

  // Sorting data
  // filteredData.sort(getSorting(orderBy, order));

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
            {filteredData.length > 0 && (
              <DiscardedNewsTableHead
                order = { order }
                orderBy = { orderBy }
                onRequestSort = { handleRequestSort }
              />
            )}
            <TableBody>
            {filteredData.length > 0 && filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => {
              return (                    
                <DiscardedNewsTableRow
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
                  handleRestoreClick = { handleRestoreClick }
                  // handleUpdateTopics = { handleUpdateTopics }
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
            onPageChange={ handleChangePage }
            onRowsPerPageChange={ handleChangeRowsPerPage }
            rowsPerPageOptions={ all }
          />
        )}
      </Paper>
      }
    </div>    
  );
}
