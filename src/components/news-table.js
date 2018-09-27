import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import NewsTableRow from './news-table-row'
import NewsTableHead from './news-table-head'
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'

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
  // title: {
  //   margin: theme.spacing.unit,
  //   flex: '0 0 auto',
  // },
});


class NewsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',  
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  // Callback that ensures that teh API calls done by this component are executed once it is mounted. 
  componentDidMount() {
    this.retrievedDocumentsList();
  }

  // Call the REST API to get all documents
  retrievedDocumentsList() {
    axios.get('http://localhost:8000/rss-news/entries')
    .then((results) => {this.setState({data: results.data.results})});      
  }


  handleChangePage(event, page) {
    this.setState({ page });
  };


  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  };
  

  handleDeleteClick(id) {
    const retrievedNews = this.state.data;
    const index = retrievedNews.findIndex(x => x._id == id);
    const removed_new = retrievedNews[index]
    axios.post('http://localhost:8000/rss-news/news/', 
                removed_new, 
                {headers: {'Content-Type': 'application/json' }}
    ).then((res) => {
        console.log(res)
        // axios.delete('http://localhost:8000/rss-news/identifier/', {params: {'documentId': id}})
        axios.delete('http://localhost:8000/rss-news/identifier/'+ id)
        .then((res) => {
              console.log(res);
            // we can update the state after response...
            retrievedNews.splice(index, 1);
            this.setState({data:retrievedNews});
        })  
    })
  }

  handleSelectedChange(event, id) {
    const value = event.target.checked;
    const retrievedNews = this.state.data;
    const index = retrievedNews.findIndex(x => x._id == id);
    axios.put('http://localhost:8000/rss-news/identifier/'+ id +'/selected/' + value )
    .then((res) => {
        console.log(res)
        retrievedNews[index].selected = value;
        // we can update the state after response...
        this.setState({data:retrievedNews});
    })
  }


  render () {
      const { classes } = this.props;
      const { data, order, orderBy, rowsPerPage, page } = this.state;
      const all = [5,10,25,(data.length)];
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      var handleSelectedChange = this.handleSelectedChange;
      var handleDeleteClick = this.handleDeleteClick;
      return (
        <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          {/* <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              Noticias
            </Typography>
          </div> */}
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <NewsTableHead/>
            </TableHead>
            <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => {
                return (

                  <NewsTableRow
                  //TODO:check why are keys for. They should ne unique and cannot be rendered in the DOM
                  // using prop.key
                    key={u._id}
                    published={u.published}
                    selected={u.selected}
                    docId={u._id}
                    title={u.title}
                    handleSelectedChange = {handleSelectedChange.bind(this)}
                    handleDeleteClick = {handleDeleteClick.bind(this)}
                  />
              );
            })} 
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
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

        </Paper>
      );
    }
  }

  NewsTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(NewsTable);