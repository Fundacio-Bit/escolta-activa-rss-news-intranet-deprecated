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
    width: 90,
  },
});


class NewsTableHead extends React.Component {
  constructor(props) {
    super(props);  
  }


  render() {
    const { classes } = this.props;
    var onRequestSort = this.props.onRequestSort;
    return (
      <TableHead>
        < TableRow >
          <TableCell 
            className = {classes.dateTableCell}
            key = "published"
            align = "right"
            sortDirection = {this.props.order} >
            <Tooltip
              title = "Sort"
              placement = 'bottom-start'
              enterDelay = { 300 } >
              <TableSortLabel
                active = { true }
                direction = {this.props.order}
                onClick = { () => onRequestSort(this.props.orderBy, this.props.order) }
              >
                <h2>Data</h2>
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          <TableCell><h2>Notícia</h2></TableCell>
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