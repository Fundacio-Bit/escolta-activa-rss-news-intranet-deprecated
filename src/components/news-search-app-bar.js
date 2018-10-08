import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  title: {
    // flexGrow: 1,
    margin: theme.spacing.unit,
    // flex: '0 0 auto',
    textAlign: 'left',
    flexBasis: '20%'
  },
  // App search
  root: {
    width: '100%',
  },
  // grow: {
  //   flexGrow: 1,
  // },
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
  // Datepicker
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  form: {
    flexBasis: '50%',
  },
  // End Datepipcker
});

class NewsSearchAppBar extends Component {
  constructor(props) {
    super(props);
  
    this.handleDate = this.handleDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  };
  
  handleDate(event){
    this.props.onSelectDate(event.target.value);
  }

  handleSelectChange(event){
    this.props.onSelectChange(event.target.value);
  }

  handleSearchTermChange(event){
    this.props.onSearchTermChange(event.target.value);  
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                Noticias
              </Typography>
            </div>

            <div className={classes.form}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Published"
                  type="date"
                  // defaultValue="2017-05-24"
                  value={this.props.selectedDate}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleDate}
                />
                <TextField
                  select
                  className={classes.textField}
                  variant="filled"
                  label="Revised"
                  value={this.props.isChecked}
                  onChange={this.handleSelectChange}
                >
                  <MenuItem value={0}>Todos</MenuItem>
                  <MenuItem value={1}>Revisados</MenuItem>
                  <MenuItem value={-1}>No revisados</MenuItem>
                </TextField>
              </form>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                type="search"
                value={this.props.searchTerm}
                onChange={this.handleSearchTermChange}
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )}
}


NewsSearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsSearchAppBar);