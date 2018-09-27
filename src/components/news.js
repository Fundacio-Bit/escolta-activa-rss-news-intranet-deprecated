import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewsTable from './news-table';
import NewsSearchAppBar from './news-search-app-bar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryISOCode: '',
      activeFilter: '' 
    };
    
    // This binding is necessary to make `this` work in the callback
    this.handleCountrySelectorChange = this.handleCountrySelectorChange.bind(this);
    this.handleActiveSelectorChange = this.handleActiveSelectorChange.bind(this);     
  }

  handleCountrySelectorChange(countrySelectorChoice){
    this.setState({ countryISOCode: countrySelectorChoice });
  };

  handleActiveSelectorChange(activeFilterSelectorChoice){
    this.setState({ activeFilter: activeFilterSelectorChoice });
  };

 
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <NewsSearchAppBar
                  // countryISOCode={this.state.countryISOCode}
                  // onCountrySelectorChange={this.handleCountrySelectorChange}
                  // activeFilter={this.state.activeFilter}
                  // onActiveSelectorChange={this.handleActiveSelectorChange}
                />
                <NewsTable
                  // countrySelectorValue = {this.state.countryISOCode}
                  // activeSelectorValue = {this.state.activeFilter}
                />     
              </Paper>
            </Grid>
          </Grid>
      </div>        
      );
    }
  }

  News.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(News);
  