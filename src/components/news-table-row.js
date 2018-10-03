import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    chip: {
      margin: theme.spacing.unit,
      fontSize: "0.8rem",
      height:"23px",
      padding:"2px 2px 2px 2px"
    },
    // avatar: {
    //   margin: theme.spacing.unit ,
    //   height:"21px",
    //   padding:"2px 2px 2px 2px"
    // },
    // icon: {
    //   margin: theme.spacing.unit,
    //   height:"15px",
    //   padding:"2px 2px 2px 2px"
    // }
  });
  
  class NewsTableRow extends Component {
    constructor(props) {
      super(props);
      // this.state = {
      //     selected: this.props.selected,
      // };
      this.handleChipDelete = this.handleChipDelete.bind(this);
      this.handleChipClick = this.handleChipClick.bind(this);
      this.handleAddTagChipClick = this.handleAddTagChipClick.bind(this);
    }
    

    handleChipDelete() {
      alert('You clicked the delete icon.'); 
    }
    
    handleChipClick() {
      alert('You clicked the Chip.');
    }

    handleAddTagChipClick() {
      alert('You clicked the Add Tag Chip.'); // eslint-disable-line no-alert
    }
    

      render () {
        const { classes } = this.props;
        var handleSelectedChange  =   this.props.handleSelectedChange;
        var handleDeleteClick  =   this.props.handleDeleteClick;
        return (
            <TableRow 
            role="checkbox"
          >
            <TableCell padding="checkbox">
              <Checkbox
                checked={this.props.selected}
                value={String(this.props.selected)}
                color="primary"
                onClick={event => handleSelectedChange(event, this.props.docId)}
                />
            </TableCell>
            <TableCell><div><h3>{this.props.published}</h3></div></TableCell>
            <TableCell>
              <div><a href={this.props.link} target="_blank"><h3>{this.props.title}</h3></a></div>
              <div>
                {this.props.tags.map(u=>{if (u!=="") {
                  return <Chip
                      label={u}
                      key= {u}
                      color="primary"
                      clickable
                      onClick={this.handleChipClick}
                      onDelete={this.handleChipDelete}                                            
                      className={classes.chip}
                    />}})}
                      <Chip
                        // avatar={
                        //   <Avatar className={classes.avatar}>
                        //     {<Icon
                        //       className={classes.icon}
                        //       color="primary">
                        //         add_circle
                        //       </Icon>}
                        //   </Avatar>}
                        avatar = {<Avatar>+</Avatar>}
                        label="Nou Tag"
                        clickable
                        onClick={this.handleAddTagChipClick}
                        className={classes.chip}
                      /> 
              </div>
            </TableCell>
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