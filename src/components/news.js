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
      searchTerm: '',
      searchDate: '', 
    };
    
    // This binding is necessary to make `this` work in the callback
    this.handleDate = this.handleDate.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }


  handleSearchTermChange(enteredSearchTerm){
    this.setState({ searchTerm: enteredSearchTerm });
  };
 
  handleDate(enteredDate) {
    this.setState({searchDate: enteredDate});
  };

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <NewsSearchAppBar
                  searchTerm={this.state.searchTerm}
                  onSearchTermChange={this.handleSearchTermChange}
                  searchDate = {this.state.searchDate}
                  onDateChange={this.handleDate}
                />
                <NewsTable
                  searchDate = {this.state.searchDate}
                  searchTerm = {this.state.searchTerm}
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
  