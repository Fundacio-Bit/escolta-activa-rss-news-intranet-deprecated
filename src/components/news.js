import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { NewsTable } from './news-table';
import { NewsTable } from './news-table-virtualized';
import NewsSearchAppBar from './news-search-app-bar';
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

class News extends Component {
  constructor(props) {
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var year_month_str = yyyy + '-' + mm

    super(props);
    this.state = {
      selectedMonth: year_month_str, 
      selectedCountry: 'Tots', 
      selectedProject: 'tourism', 
      isChecked: 0,
      searchType: 0,
      searchTerm: '',
    };
    
    // This binding is necessary to make `this` work in the callback
    // this.handleDateFrom = this.handleDateFrom.bind(this);
    // this.handleDateTo = this.handleDateTo.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleRevisedSelectChange = this.handleRevisedSelectChange.bind(this);
    this.handleCountrySelectChange = this.handleCountrySelectChange.bind(this);
    this.handleProjectSelectChange = this.handleProjectSelectChange.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
  }
  
  handleChangeMonth(enteredDate) {
    this.setState({selectedMonth: enteredDate});
  }

  handleRevisedSelectChange(isChecked){
    this.setState({ isChecked: isChecked });
  }

  handleCountrySelectChange(enteredCountry){
    this.setState({ selectedCountry: enteredCountry });
  }

  handleProjectSelectChange(project){
    this.setState({ selectedProject: project });
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
                <NewsSearchAppBar
                  selectedMonth = {this.state.selectedMonth}
                  onSelectMonth={this.handleChangeMonth}
                  isChecked={this.state.isChecked}
                  onRevisedSelectChange={this.handleRevisedSelectChange}
                  selectedCountry={this.state.selectedCountry}
                  selectedProject={this.state.selectedProject}
                  onCountrySelectChange={this.handleCountrySelectChange}
                  onProjectSelectChange={this.handleProjectSelectChange}
                  searchTerm={this.state.searchTerm}
                  searchType={this.state.searchType}
                  onSearchTermChange={this.handleSearchTermChange}
                  onSearchTypeChange={this.handleSearchTypeChange}
                />
                <NewsTable 
                  selectedMonth = {this.state.selectedMonth}
                  selectedCountry = {this.state.selectedCountry}
                  selectedProject = {this.state.selectedProject}
                  isChecked={this.state.isChecked}
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

  News.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(News);
  