import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress'
// import { emphasize } from '@material-ui/core/styles/colorManipulator';

// Integrating the autocomplete code from material ui requires to use ES7,
// adding a preset to the babel loader and installing the necessary package it can be transpiled
// https://stefan.magnuson.co/articles/frontend/using-es7-spread-operator-with-webpack/

const styles = theme => ({
    // button: {
    //   margin: theme.spacing(y),
    // },
    chip: {
      // margin: theme.spacing(y),
      fontSize: "0.8rem",
      height:"23px",
      padding:"2px 2px 2px 2px",
    },
    dateTableCell: {
      width: 90,
    },
    tooltipContainer:{
      overflow: 'visible'
    },
    customizedTooltip: {
      fontSize: 14,
      maxWidth: 400,
      marginRight: 50
    },
    root: {
      overflowY:'hidden',
      flexGrow: 1,
      height: 290,
      width: 500,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
    },
    // noOptionsMessage: {
    //   padding: `${theme.spacing(y)}px ${theme.spacing(y) * 2}px`,
    // },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      // marginTop: theme.spacing(y),
      left: 0,
      right: 0,
    }
  });  

  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props}/>;
  }

  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function Control(props) {    
    return (      
      <TextField        
        fullWidth  
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps            
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {    
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }

  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  

  // components are used to set the style of the autocomplete component (NoSsr) elements
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };
  
  class NewsTableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        assignedTopics: this.props.topics,
        textFieldValue: "",
        isLoading: this.props.isUpdating
      };

      this.handleDialogClickOpen  =  this.handleDialogClickOpen.bind(this);
      this.handleDialogClose  =   this.handleDialogClose.bind(this);
      this.handleUpdateByDeleting  =   this.handleUpdateByDeleting.bind(this);
      this.handleTextFieldValueChange  =   this.handleTextFieldValueChange.bind(this);
    }

    // It looks like that at this class level/scope we are using Typescript.It does not allow to
    // use var, let or const for variable definition. They are catalogued as public (by default) or
    // private and declared using just the = sign
    // Source: https://stackoverflow.com/questions/45464245/angular-unexpected-token-a-constructor-method-accessor-or-property-was-expe


    handleDialogClickOpen(){
      this.setState({ open: true });
    }
  
    handleDialogClose() {
      this.setState({ 
        textFieldValue: "",
        open: false });
    }

    handleUpdateByDeleting(deletedTopic) {
      let updatedTopicsArray = this.state.assignedTopics;
      const index = updatedTopicsArray.indexOf(deletedTopic);
      if (index !== -1){updatedTopicsArray.splice(index, 1)};      
      this.props.handleUpdateTopics(this.props.docId, updatedTopicsArray.join(","))
      this.setState({ assignedTopics: updatedTopicsArray});
    }

    handleTextFieldValueChange(event){this.setState({ textFieldValue: event.target.value})}

    handleChange(event)
      {
        if (event.value != "") {
          let updatedTopicsArray = this.state.assignedTopics;
          updatedTopicsArray.push(event.value);
          updatedTopicsArray = [...new Set(updatedTopicsArray)]
          this.props.handleUpdateTopics(this.props.docId, updatedTopicsArray.join(","))
          this.setState(
            {
              assignedTopics: updatedTopicsArray,
              open: false
            });
          }
      }

    render () {
      const { classes, theme } = this.props;
      const isLoading = this.state.isLoading;

      const selectStyles = {
        input: base => ({
          ...base,
          color: theme.palette.text.primary,
          '& input': {
            font: 'inherit',
          },
        }),
      };

      var handleDeleteClick  =   this.props.handleDeleteClick;
      var possibleTopics = this.props.allPossibleTopics ? this.props.allPossibleTopics: [];

      var selectableOptions = possibleTopics.map(suggestion => ({value: suggestion, label: suggestion}));
      this.state.textFieldValue != "" ?
        selectableOptions.push({value: this.state.textFieldValue, label: this.state.textFieldValue}): null;

      return(
        <TableRow>
          <TableCell><div><h3>{new Date(this.props.published).toLocaleString()}</h3></div></TableCell>
          <TableCell>
            <div classes={{ tooltipContainer: classes.tooltipContainer }}>
              <Tooltip
                classes={{ tooltip: classes.customizedTooltip }}
                title={
                  <React.Fragment>
                    <p>{ this.props.summary.length > 600 ? `${this.props.summary.slice(0,600)}...`: this.props.summary }</p>
                    <p><strong>{this.props.source_name}</strong> </p>
                    <p>{ this.props.section.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>
                      })}</p>
                    <p>Marca: <strong>{ this.props.brand }</strong></p>
                  </React.Fragment>}
                enterDelay={500}
                leaveDelay={200}>
                <a href={this.props.link}  style={{ textDecoration: 'none' }} target="_blank"><h3>{this.props.title}</h3></a>
              </Tooltip>
            </div>
            <div>
              {this.props.topics.map(u=>{if (u!=="") {
                return <Chip
                    label={u}
                    key= {u}
                    color="primary"
                    clickable
                    onDelete={() => this.handleUpdateByDeleting(u)}                                         
                    className={classes.chip}
                  />}})}
                    <Chip
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
                        <DialogTitle id="form-dialog-title">Cerca o afegeix un tema</DialogTitle>
                        <DialogContent>   
                          <div                           
                            className={classes.root}
                            onChange={event => this.handleTextFieldValueChange(event)}
                            >
                            <NoSsr>
                              <Select
                                id="topicSelector"                                              
                                tabIndex="1"
                                classes={classes}
                                styles={selectStyles}
                                textFieldProps={{
                                  InputLabelProps: {
                                    shrink: true,
                                  },
                                }}
                                options={selectableOptions}
                                components={components}
                                value={this.state.single}
                                onChange={event => this.handleChange(event)}                            
                                placeholder="Escriu per obtenir suggerències"
                                autoFocus
                              />
                            </NoSsr>
                          </div>
                        </DialogContent>                          
                        <DialogActions>
                          <Button tabIndex="2" onClick={this.handleDialogClose} color="primary">Cancel·la</Button>
                        </DialogActions>
                    </Dialog>
            </div>
          </TableCell>
          <TableCell>
            { isLoading && <div>
              <div className={classes.loading}>
              <CircularProgress size={24} thickness={4} />
              </div>
            </div>}
            { !isLoading && <IconButton 
              className={classes.button} 
              aria-label="Delete" 
              onClick= 
                {() => {
                  this.setState(
                    {isLoading: true })
                  handleDeleteClick(this.props.docId)
                  }  
                }>
              <DeleteIcon />
            </IconButton>}
          </TableCell>
        </TableRow>  
      )
    } 
  }

NewsTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  export default withStyles(styles,{ withTheme: true })(NewsTableRow);