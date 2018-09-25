import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import SourceRow from './source-row';


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
  title: {
    margin: theme.spacing.unit,
    flex: '0 0 auto',
  },
  // children: {
  //   minWidth: 700,
  // },
});

class SourcesList extends Component {
  constructor(props) {
    super(props);
    this.state = {        
        rssSources : [],
        page: 0,
        rowsPerPage: 10,
    };
  // This binding is necessary to make `this` work in the callback
  this.handleChangePage = this.handleChangePage.bind(this);
  this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  this.filterResourcesList = this.filterResourcesList.bind(this);
  this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  //  Callback that ensures that teh API calls done by this component are executed once it is mounted. 
  componentDidMount() {
    this.retrievedDocumentsList();
  }

//  Call the REST API to get all documents
  retrievedDocumentsList() {
    var self = this;
    axios.get('http://localhost:8000/rss-sources/sources')
    .then((results) => {self.setState({rssSources: results.data.results})})
  }

  handleChangePage(event, page) {
    this.setState({ page });
  };


  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  };

  // filterResourcesList(resourcesList) {
  //   self= this.props;
  //   var my_list = resourcesList.map(u => {
  //       if (u.source_id.indexOf(self.countrySelectorValue)!== -1 &&
  //          (self.activeSelectorValue === "" ||
  //          u.is_active === (self.activeSelectorValue !== 'false'))){
  //             return u
  //           }
  //         });
  //   return my_list
  // };

  filterResourcesList(resource) {
    if (resource.source_id.indexOf(this.props.countrySelectorValue)!== -1 &&
        (this.props.activeSelectorValue === "" ||
        resource.is_active === (this.props.activeSelectorValue !== 'false'))){
          return true;
        }
    else return false;
  };

  handleToggleClick(id, isActiveFlag) {
    axios.put('http://localhost:8000/rss-sources/identifier/'+ id +'/active/' + isActiveFlag)
        .then((res) => {
            // we can update the state after response...
            console.log(res);
            const retrievedSources = this.state.rssSources;
            const index = retrievedSources.findIndex(x => x._id == id);
            retrievedSources[index].is_active = isActiveFlag;
            // we can update the state after response...
            this.setState({rssSources:retrievedSources});              

        })
}

  render () { 
    const { classes } = this.props;
    const { rssSources, order, orderBy, rowsPerPage, page } = this.state;
    // const filteredSources = this.filterResourcesList(rssSources)
    const filteredSources = rssSources.filter(this.filterResourcesList)
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rssSources.length - page * rowsPerPage);
    return (
      <div className={classes.tableWrapper}>
        <div className={classes.title}> 
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableBody>
              {filteredSources &&
                  filteredSources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => {                    
                    return (
                      <SourceRow
                        //TODO:check what are keys for.
                        // They should be unique and cannot be rendered in the DOM using prop.key
                        key={u._id}
                        // published={u.published}
                        // newsCounter={u.news_counter}
                        handleToggleClick = {this.handleToggleClick}
                        docId={u._id}
                        isActive={u.is_active}
                        sourceId={u.source_id}
                        sourceName={u.source_name}
                        section={u.section}
                        isOperative={u.is_operative}
                        frequency={u.average_mins_between_news}
                        feedUrl={u.feed_url}
                      />
                    );                     
                })
              }
              {/* {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )} */}
            </TableBody>
          </Table>
        </div>
        <TablePagination
        component="div"
        count={filteredSources.length}
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
      />
     </div>
      );
    }
  }

  SourcesList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default  withStyles(styles)(SourcesList);