import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DiscardedNewsTable } from './discarded-news-table';
import DiscardedNewsSearchAppBar from './discarded-news-search-app-bar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(y) * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class DiscardedNews extends Component {
  constructor(props) {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
  
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    dd = String(yesterday.getDate()).padStart(2, '0');
    mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = yesterday.getFullYear();
    yesterday = yyyy + '-' + mm + '-' + dd;

    super(props);
    this.state = {
      selectedDateFrom: yesterday,
      selectedDateTo: today,
      searchType: '0',
      searchTerm: '',
    };
    
    // Create a ref b
    // this.newsTableElement = React.createRef();

    // This binding is necessary to make `this` work in the callback
    this.handleDateFrom = this.handleDateFrom.bind(this);
    this.handleDateTo = this.handleDateTo.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
  }


  handleDateFrom(enteredDate) {
    this.setState({selectedDateFrom: enteredDate});
  }

  handleDateTo(enteredDate) {
    this.setState({selectedDateTo: enteredDate});
  }

  handleSearchTermChange(enteredSearchTerm){
    this.setState({ searchTerm: enteredSearchTerm });
  }

  handleSearchTypeChange(enteredSearchType){
    this.setState({ searchType: enteredSearchType });
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={10}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DiscardedNewsSearchAppBar
                  selectedDateFrom = {this.state.selectedDateFrom}
                  selectedDateTo = {this.state.selectedDateTo}
                  onSelectDateFrom={this.handleDateFrom}
                  onSelectDateTo={this.handleDateTo}
                  searchTerm={this.state.searchTerm}
                  searchType={this.state.searchType}
                  onSearchTermChange={this.handleSearchTermChange}
                  onSearchTypeChange={this.handleSearchTypeChange}
                />
                <DiscardedNewsTable
                  // innerRef={this.newsTableElement}
                  selectedDateFrom = {this.state.selectedDateFrom}
                  selectedDateTo = {this.state.selectedDateTo}
                  searchType = {this.state.searchType}
                  searchTerm = {this.state.searchTerm}
                />     
              </Paper>
            </Grid>
          </Grid>
      </div>        
      );
    }
  }

  DiscardedNews.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DiscardedNews);
  