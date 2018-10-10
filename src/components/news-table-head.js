import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';


const styles = theme => ({
  dateTableCell: {
    width: 120,
  },
});


class NewsTableHead extends React.Component {
  constructor(props) {
    super(props);  
    this.createSortHandler = this.createSortHandler.bind(this);
  }

  createSortHandler (orderBy, order, event) {
    this.props.onRequestSort(event, orderBy, order);
  };

  render() {
    const { classes } = this.props;
    var onRequestSort = this.props.onRequestSort;
    return (
      <TableHead>
        < TableRow >
          <TableCell></TableCell>
          <TableCell className = {classes.dateTableCell}
            key = "date"
            numeric = { false }
            sortDirection = {this.props.order} >
            <Tooltip
              title = "Sort"
              placement = 'bottom-start'
              enterDelay = { 300 } >
              <TableSortLabel
                active = { true }
                direction = {this.props.order}
                // onClick = { () => onRequestSort(this) } >
                onClick = { () => this.createSortHandler(this.props.orderBy, this.props.order) } >
                <h2>Date</h2>
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          <TableCell><h2>Title</h2></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

NewsTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(NewsTableHead);