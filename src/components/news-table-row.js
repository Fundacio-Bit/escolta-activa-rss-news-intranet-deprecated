import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });
  
  class NewsTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
        };
    }
    
    handleSelectedChange(event, id) {
        const value = event.target.checked;
        axios.put('http://localhost:8000/rss-news/identifier/'+ id +'/selected/' + String(value) )
        .then((res) => {
            console.log(res)
            // we can update the state after response...
            this.setState({
              selected: value
          });
        })
      }
    

      render () {
        const { classes } = this.props;
        var handleDeleteClick  =   this.props.handleDeleteClick;
        return (
            <TableRow 
            role="checkbox"
            onClick={event => this.handleSelectedChange(event, this.props.docId)}
          >
            <TableCell padding="checkbox">
              <Checkbox
                checked={this.state.selected}
                value={String(this.state.selected)}
                color="primary"
              />
            </TableCell>
            <TableCell>{this.props.published}</TableCell>
            <TableCell>{this.props.title}</TableCell>
            <TableCell>
              <IconButton 
                className={classes.button} 
                aria-label="Delete" 
                onClick={() => handleDeleteClick(this.props.docId)} >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );

    }
}

NewsTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(NewsTableRow);