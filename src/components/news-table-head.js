import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  dateTableCell: {
    width: 120,
  },
  chip: {
    margin: theme.spacing.unit,
  }
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
        <TableCell className={classes.dateTableCell}><h1>Updating Date</h1></TableCell>
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