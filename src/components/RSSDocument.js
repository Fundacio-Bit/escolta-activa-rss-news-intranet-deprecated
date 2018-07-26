import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
  
  class RSSDocument extends Component {
    render () {
        const { classes } = this.props;
        return (
            <li>
                <h1>{this.props.docId}</h1>
                <p>{this.props.title}</p><br></br>
                <IconButton className={classes.button} aria-label="Select">
                    <CheckIcon />
                </IconButton>
                <IconButton className={classes.button} aria-label="Delete">
                    <DeleteIcon />
                </IconButton>
            </li>
        );
    }
}

export default withStyles(styles)(RSSDocument);