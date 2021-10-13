import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { FormControl, AppBar, Toolbar, Select, MenuItem, InputLabel, IconButton, Typography, Paper, InputBase } 
  from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: "3em",
  },
  // Bar title
  title: {
    // margin: theme.spacing(y),
    textAlign: 'left',
    flexBasis: '20%'
  },
  // Filters
  form:{
    flexBasis: '50%'
  },
  formControl: {
    // margin: theme.spacing(y),
    minWidth: 120,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  // Search
  search: {
    marginLeft: 10,
    display: 'flex',
    height: 50,
    marginTop:7
  },
  iconButton: {
    marginTop: 8,
    padding: 10,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    // paddingTop: theme.spacing(y),
    // paddingRight: theme.spacing(y),
    // paddingBottom: theme.spacing(y),
    // paddingLeft: theme.spacing(y) * 10,
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

    // This binding is necessary to make `this` work in the callback
    this.handleCountrySelectorChange = this.handleCountrySelectorChange.bind(this);
    this.handleActiveSelectorChange = this.handleActiveSelectorChange.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleCountrySelectorChange(event){
    this.props.onCountrySelectorChange(event.target.value);  
  };

  handleActiveSelectorChange(event){
    this.props.onActiveSelectorChange(event.target.value);  
  };

  handleSearchTextChange(event){
    this.props.onSearchTextChange(event.target.value);  
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
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
                    <MenuItem value=""><em>Tots</em></MenuItem>
                    <MenuItem value={"ES"}>Espanya</MenuItem>
                    <MenuItem value={"DE"}>Alemanya</MenuItem>
                    <MenuItem value={"UK"}>Regne Unit</MenuItem>
                    <MenuItem value={"FR"}>França</MenuItem>
                    <MenuItem value={"IT"}>Itàlia</MenuItem>
                    <MenuItem value={"AT"}>Àustria</MenuItem>
                    <MenuItem value={"NL"}>Holanda</MenuItem>
                    <MenuItem value={"SE"}>Suècia</MenuItem>
                    <MenuItem value={"SZ"}>Suïssa</MenuItem>
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
              {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}/> */}

              <Paper className={classes.search} elevation={1}>
                <InputBase
                  style={{width:"100%"}}
                  value={this.props.searchText}
                  onChange={this.handleSearchTextChange}
                  // Prevent form submission a data reload when the Enter Key is pressed
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Cerca…"
                  className={classes.input}
                />
                <IconButton className={classes.iconButton} aria-label="Search">
                  <SearchIcon />
                </IconButton>
              </Paper>

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