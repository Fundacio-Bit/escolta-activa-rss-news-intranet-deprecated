import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
  dateTableCell: {
    width: 120,
  },
});


class NewsTableHead extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell className={classes.dateTableCell}><h2>Updating Date</h2></TableCell>
        <TableCell><h2>Title</h2></TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  }
}

NewsTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(NewsTableHead);