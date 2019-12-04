/* eslint-disable no-prototype-builtins */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import DiscardedNewsTableRow from './discarded-news-table-row'
import NewsTableHead from './news-table-head'
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'
import RSSSnackbarContent from './rss-snackbar-content'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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
  margin: {
    margin: theme.spacing.unit,
  },
});


var desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


var getSorting = (orderBy, order) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};


class DiscardedNewsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
      orderBy: 'published',  
      data: [],
      allTopics:[],
      page: 0,
      rowsPerPage: 5
    };
    // This binding is necessary to make `this` work in the callback
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.filterByTopic = this.filterByTopic.bind(this);
    this.filterBySearchTerm = this.filterBySearchTerm.bind(this);
  }

  // Callback that ensures that teh API calls done by this component are executed once it is mounted. 
  componentDidMount() {
    this.retrievedDocumentsList();
    this.getTopicsList();
  }

  // Call the REST API to get all documents
  retrievedDocumentsList() {
    axios.get('/rss-discarded-news/entries')
    .then((results) => {this.setState({ data: results.data.results })});      
  }

  // Call the REST API to get a list of topics used so far
  getTopicsList() {
    axios.get('/rss-topics/topics')
    .then((results) => {this.setState({ allTopics: results.data.results })});      
  }

  handleChangePage(event, page) {
    this.setState({ page });
  }

  handleChangeFormField() {
    this.setState({ page: 0 });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }
  
  handleRestoreClick(id) {
    const retrievedNews = this.state.data;
    const index = retrievedNews.findIndex(x => x._id == id);
    const removed_new = retrievedNews[index]
    axios.post('/rss-news/news/', 
                removed_new, 
                {headers: {'Content-Type': 'application/json' }}
    ).then((res) => {
        // axios.delete('/rss-news/identifier/', {params: {'documentId': id}})
        axios.delete('/rss-news/identifier/'+ id)
        .then((res) => {
            // we update the state after response...
            retrievedNews.splice(index, 1);
            this.setState({data:retrievedNews});
            this.getTopicsList();
        })  
    })
  }

  // TODO: handle the addition of topics with special chars or commas. Also avoid duplicates.
  handleUpdateTopics(id, topicsString) {
    console.log(topicsString.toString().toLowerCase())
    let retrievedNews = this.state.data;
    const index = retrievedNews.findIndex(x => x._id == id);
    var processedTopicsString = topicsString == "" ? "%20" : topicsString.toString().toLowerCase();

    // TODO: update via POST instead of via put to avoid problems with long URLS and with special chars
    axios.put('/rss-news/identifier/'+ id +'/topics/' + processedTopicsString )
    .then((res) => {
        retrievedNews[index].topics = processedTopicsString == "%20" ? "": processedTopicsString;
        // we update the state after response...
        this.setState({data:retrievedNews});
        this.getTopicsList();
    })
  }

  handleRequestSort (orderBy, order, event) {
    // const orderBy = property;
    order = 'desc';

    if (this.state.orderBy === orderBy && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({
      order,
      orderBy
    });
  }

  filterByDate(pressNew) {
    var dateFrom = this.props.selectedDateFrom.split("-");
    var dateTo = this.props.selectedDateTo.split("-");

    var from = new Date(dateFrom[0], parseInt(dateFrom[1])-1, dateFrom[2]);  // -1 because months are from 0 to 11
    var to   = new Date(dateTo[0], parseInt(dateTo[1])-1, dateTo[2]);

    if (pressNew.hasOwnProperty("published"))
    {
      var datePublished = pressNew.published.split("-")
      var published = new Date(datePublished[0], parseInt(datePublished[1])-1, datePublished[2].split(' ')[0]);
      if (published >= from && published <= to){
        return true
      } else return false
    }
  }

  filterByTopic(pressNew) {
    if (
      pressNew.hasOwnProperty("topics") && pressNew.topics.toLowerCase().split(",").includes(this.props.searchTerm.toLowerCase())){
        return true
      }
    else return false
  }

  // TODO: add search in full text
  filterBySearchTerm(pressNew) {
    if (
      pressNew.hasOwnProperty("title") && pressNew.title.toLowerCase().indexOf(this.props.searchTerm.toLowerCase())!== -1
      ) {return true}
    else return false
  }


  render () {
      const { classes } = this.props;
      const { data, order, orderBy, rowsPerPage, page } = this.state;
      const all = [5,10,25,(data.length)];
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      
      // Filtering data
      var filteredData = data

      if (this.props.selectedDateFrom) {
        filteredData = data.filter(this.filterByDate);
      } 
      if (this.props.selectedDateTo) {
        filteredData = data.filter(this.filterByDate);
      } 
      if (this.props.searchType === 0){
        filteredData = filteredData.filter(this.filterBySearchTerm);
      } else if (this.props.searchType === 1 && this.props.searchTerm !== ""){
        filteredData = filteredData.filter(this.filterByTopic);
      }

      // Sorting data
      filteredData.sort(getSorting(orderBy, order));

      var handleRestoreClick = this.handleRestoreClick;
      var handleRequestSort = this.handleRequestSort;
      var handleUpdateTopics = this.handleUpdateTopics;

      return (
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {filteredData.length > 0 && (
                <NewsTableHead
                  order = { order }
                  orderBy = { orderBy }
                  onRequestSort = { handleRequestSort.bind(this) }
                />
              )}
              <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => {
                return (                    
                  <DiscardedNewsTableRow
                  //TODO:check what are keys for. They should be unique and cannot be rendered in the DOM
                  // using prop.key
                    key={u._id}
                    published={u.published}
                    docId={u._id}
                    title={u.title}
                    topics={u.hasOwnProperty("topics") && u.topics != ""? u.topics.split(",") : []}
                    allPossibleTopics= {this.state.allTopics}
                    source_id={u.source_id}
                    source_name={u.source_name}
                    link={u.link}
                    summary={u.summary}
                    handleRestoreClick = {handleRestoreClick.bind(this)}
                    handleUpdateTopics = {handleUpdateTopics.bind(this)}
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
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              rowsPerPageOptions={all}
            />
          )}
        </Paper>
      );
    }
  }

  DiscardedNewsTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(DiscardedNewsTable);