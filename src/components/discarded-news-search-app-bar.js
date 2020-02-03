import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    // flexGrow: 1,
    // margin: theme.spacing(y),
    textAlign: 'left',
    flexBasis: '15%'
  },
  // form
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight:0
  },
  form: {
    flexBasis: '85%',
  },

  textField: {
    marginLeft: 20,
    width: '15%',
  },

  selectMenu:{
    color: 'red',
  },
  
  search: {
    marginLeft: 15,
    display: 'flex',
    alignItems: 'center',
    width: "30%",
    height: 50
  },

  select: {
    width: '30%',
  },

  input: {
    marginLeft: 8,
    height: 50,
    marginTop: 15
  },

  iconButton: {
    padding: 10,
  },
});

class DiscardedNewsSearchAppBar extends Component {
  constructor(props) {
    super(props);
  
    this.handleDateFrom = this.handleDateFrom.bind(this);
    this.handleDateTo = this.handleDateTo.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
  }
  
  handleDateFrom(event){
    this.props.onSelectDateFrom(event.target.value);
  }

  handleDateTo(event){
    this.props.onSelectDateTo(event.target.value);
  }

  handleSearchTermChange(event){
    this.props.onSearchTermChange(event.target.value);  
  }
  
  handleSearchTypeChange(event){
    this.props.onSearchTypeChange(event.target.value);  
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                Noticias descartadas
              </Typography>
            </div>
            <div className={classes.form}>
              <form className={classes.container} noValidate>
                <TextField
                  id="dateFrom"
                  label="Des de"
                  type="date"
                  value={this.props.selectedDateFrom}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleDateFrom}
                />
                <TextField
                  id="dateTo"
                  label="Fins a"
                  type="date"
                  value={this.props.selectedDateTo}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleDateTo}
                />
                <Paper className={classes.search} elevation={1}>
                  <TextField
                    select
                    className={classes.select}
                    value={this.props.searchType}
                    onChange={this.handleSearchTypeChange}
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      margin: "dense"
                    }}
                  >        
                    <MenuItem value={0}>Text</MenuItem>
                    <MenuItem value={1}>Tema</MenuItem>
                  </TextField>
                  <InputBase
                    value={this.props.searchTerm}
                    onChange={this.handleSearchTermChange}
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
              </form>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )}
}


DiscardedNewsSearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DiscardedNewsSearchAppBar);