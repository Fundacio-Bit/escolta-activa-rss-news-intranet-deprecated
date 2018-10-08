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
      selectedDate: '', 
      isChecked: 0,
      searchTerm: '',
    };
    
    // This binding is necessary to make `this` work in the callback
    this.handleDate = this.handleDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }


  handleDate(enteredDate) {
    this.setState({selectedDate: enteredDate});
  };


  handleSelectChange(isChecked){
    this.setState({ isChecked: isChecked });
  };


  handleSearchTermChange(enteredSearchTerm){
    this.setState({ searchTerm: enteredSearchTerm });
  };
 

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <NewsSearchAppBar
                  selectedDate = {this.state.selectedDate}
                  onSelectDate={this.handleDate}
                  isChecked={this.state.isChecked}
                  onSelectChange={this.handleSelectChange}
                  searchTerm={this.state.searchTerm}
                  onSearchTermChange={this.handleSearchTermChange}
                />
                <NewsTable
                  selectedDate = {this.state.selectedDate}
                  isChecked={this.state.isChecked}
                  searchTerm = {this.state.searchTerm}
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
  