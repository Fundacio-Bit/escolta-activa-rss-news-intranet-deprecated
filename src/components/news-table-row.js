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


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    chip: {
      margin: theme.spacing.unit,
      fontSize: "0.8rem",
      height:"23px",
      padding:"2px 2px 2px 2px",
      // background-color: "#4b4c52"
    },
    dateTableCell: {
      width: 90,
    },
    customizedTooltip: {
      fontSize: 14,
      maxWidth: 600,
    }
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
      this.state = {
          open: false,
          newTopics: "" 
      };
      this.handleChipDelete = this.handleChipDelete.bind(this);
      this.handleChipClick = this.handleChipClick.bind(this);
      this.handleDialogClickOpen  =  this.handleDialogClickOpen.bind(this);
      this.handleDialogClose  =   this.handleDialogClose.bind(this);
      this.handleDialogAddAndClose  =   this.handleDialogAddAndClose.bind(this);
    }
    

    handleChipDelete() {
      alert('You clicked the delete icon.'); 
    }
    
    handleChipClick() {
      alert('You clicked the Chip.');
    }

    handleDialogClickOpen(){
      this.setState({ open: true });
    };
  
    handleDialogClose() {
      this.setState({ open: false });
    };

    handleTextFieldChange(event) {
      this.setState({ newTopics: event.target.value });
    };

    handleDialogAddAndClose() {
      this.props.handleAddTopic(this.props.docId, this.state.newTopics)
      this.setState({ open: false });
    };


      render () {
        const { classes } = this.props;
        var handleRevisedSelectedChange  =   this.props.handleRevisedSelectedChange;
        var handleDeleteClick  =   this.props.handleDeleteClick;
        var handleDeleteTopic  =   this.props.handleDeleteTopic;
 
        return (
            <TableRow 
            role="checkbox"
          >
            <TableCell className = {classes.dateTableCell} padding="checkbox">
              <Checkbox
                checked={this.props.selected}
                value={String(this.props.selected)}
                color="primary"
                onClick={event => handleRevisedSelectedChange(event, this.props.docId)}
                />
            </TableCell>
            <TableCell><div><h3>{this.props.published}</h3></div></TableCell>
            <TableCell>
              <div>
                <Tooltip classes={{ tooltip: classes.customizedTooltip }} title={this.props.summary} enterDelay={500} leaveDelay={200}>
                  <a href={this.props.link} target="_blank"><h3>{this.props.title}</h3></a>
                </Tooltip>
              </div>
              <div>
                {this.props.topics.map(u=>{if (u!=="") {
                  return <Chip
                      label={u}
                      key= {u}
                      color="primary"
                      clickable
                      onClick={this.handleChipClick}
                      onDelete={() => handleDeleteTopic(this.props.docId, u)}                                          
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
                        label="Nou Tema"
                        clickable
                        onClick={this.handleDialogClickOpen}
                        className={classes.chip}
                      />
                      <Dialog
                        open={this.state.open}
                        onClose={this.handleDialogClose}
                        aria-labelledby="form-dialog-title">
                          <DialogTitle id="form-dialog-title">Addició de temes</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                            Escriu el tema que vols afegir. Si el tema està repetit no s'afegirà.
                            </DialogContentText>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Tema(s)"
                            fullWidth
                            onChange = {event => this.handleTextFieldChange(event)}
                            />
                          </DialogContent>                          
                          <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">Cancel·la</Button>
                            <Button 
                              onClick={this.handleDialogAddAndClose}
                              color="primary">
                              Afegeix
                            </Button>
                          </DialogActions>
                      </Dialog>
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