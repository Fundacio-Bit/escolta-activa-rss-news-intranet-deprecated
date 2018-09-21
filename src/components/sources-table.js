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

  render () { 
    const { classes } = this.props;
    const { rssSources, order, orderBy, rowsPerPage, page } = this.state;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rssSources.length - page * rowsPerPage);
    return (
      <div className={classes.tableWrapper}>
        <div className={classes.title}> 
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableBody>
              {rssSources &&
                  rssSources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => {
                      if (u.source_id.indexOf(this.props.countrySelectorValue)!== -1 &&
                          (this.props.activeSelectorValue === "" ||
                          u.is_active === (this.props.activeSelectorValue !== 'false'))){
                        return (
                          <SourceRow
                            //TODO:check what are keys for.
                            // They should be unique and cannot be rendered in the DOM using prop.key
                            key={u._id}
                            // published={u.published}
                            // newsCounter={u.news_counter}
                            docId={u._id}
                            isActive={u.is_active}
                            sourceId={u.source_id}
                            source_name={u.source_name}
                            section={u.section}
                          />
                        );
                      }
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
        count={rssSources.length}
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