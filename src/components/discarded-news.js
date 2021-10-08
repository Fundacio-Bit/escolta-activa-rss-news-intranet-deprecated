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
    marginTop: "3em",
  },
  paper: {
    // padding: theme.spacing(y) * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class DiscardedNews extends Component {
  constructor(props) {
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var year_month_str = yyyy + '-' + mm

    super(props);
    this.state = {
      selectedMonth: year_month_str, 
      searchType: 0,
      searchTerm: '',
    };
    

    // This binding is necessary to make `this` work in the callback
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
  }
    
  handleChangeMonth(enteredDate) {
    this.setState({selectedMonth: enteredDate});
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
                  selectedMonth = {this.state.selectedMonth}
                  onSelectMonth={this.handleChangeMonth}
                  searchTerm={this.state.searchTerm}
                  searchType={this.state.searchType}
                  onSearchTermChange={this.handleSearchTermChange}
                  onSearchTypeChange={this.handleSearchTypeChange}
                />
                <DiscardedNewsTable
                  selectedMonth = {this.state.selectedMonth}
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
  