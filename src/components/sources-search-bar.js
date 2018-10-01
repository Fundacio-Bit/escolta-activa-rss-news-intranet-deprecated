import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root: {
    width: '100%',
  },
  // Bar title
  title: {
    margin: theme.spacing.unit,
    textAlign: 'left',
    flexBasis: '20%'
  },
  // Filters
  form:{
    flexBasis: '50%'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  // Search
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});


class SearchBar extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   countryISOCode: '',
    // };
    // This binding is necessary to make `this` work in the callback
    this.handleCountrySelectorChange = this.handleCountrySelectorChange.bind(this);
    this.handleActiveSelectorChange = this.handleActiveSelectorChange.bind(this);
  }

  handleCountrySelectorChange(event){
    console.log("Country " + event.target.value)
    this.props.onCountrySelectorChange(event.target.value);  
  };

  handleActiveSelectorChange(event){
    console.log("Active " + event.target.value)
    this.props.onActiveSelectorChange(event.target.value);  
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                Fonts
              </Typography>
            </div>

            <div className={classes.form}>
              <form className={classes.container} autoComplete="off">                
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="country-simple">Pais</InputLabel>
                  <Select
                    value={this.props.countryISOCode}
                    onChange={this.handleCountrySelectorChange}
                    inputProps={{
                      name: 'countryISOCode',
                      id: 'country-simple',}}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={"ES"}>Espanya</MenuItem>
                    <MenuItem value={"DE"}>Alemanya</MenuItem>
                    <MenuItem value={"UK"}>Regne Unit</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="active-simple">Extracció</InputLabel>
                  <Select
                    value={this.props.activeFilter}
                    onChange={this.handleActiveSelectorChange}
                    inputProps={{
                      name: 'active',
                      id: 'active-simple',}}>
                    <MenuItem value=""><em>Tots</em></MenuItem>
                    <MenuItem value={"true"} selected="selected">Activa</MenuItem>
                    <MenuItem value={"false"}>Inactiva</MenuItem>           
                  </Select>
                </FormControl>
              </form>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}/>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      )
    }
  }

  SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles) (SearchBar);