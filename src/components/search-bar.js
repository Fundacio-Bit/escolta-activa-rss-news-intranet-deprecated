import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="country-simple">Pais</InputLabel>
          <Select
            value={this.props.countryISOCode}
            onChange={this.handleCountrySelectorChange}
            inputProps={{
              name: 'countryISOCode',
              id: 'country-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
              id: 'active-simple',
            }}
          >
            <MenuItem value="">
              <em>Tots</em>
            </MenuItem>
            <MenuItem value={"true"} selected="selected">Activa</MenuItem>
            <MenuItem value={"false"}>Inactiva</MenuItem>           
          </Select>
        </FormControl>
      </form>
      )
    }
  }

  SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles) (SearchBar);