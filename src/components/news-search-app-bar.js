import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
    paddingTop: '15px',
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
    minWidth:'12%',
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 20, 
    marginTop:10
  },
  selectMenu:{
    color: 'red',
  },  
  search: {
    marginLeft: 10,
    display: 'flex',
    height: 50,
    marginTop:7
  },

  searchSelect: {
    width: '30%'
  },

  input: {
    marginLeft: 8,
    marginTop: 8,
    height: 50,
  },

  iconButton: {
    marginTop: 8,
    padding: 10,
  },
});

class NewsSearchAppBar extends Component {
  constructor(props) {
    super(props);

    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleRevisedSelectChange = this.handleRevisedSelectChange.bind(this);
    this.handleCountrySelectChange = this.handleCountrySelectChange.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
  }

  handleMonthChange(event){
    this.props.onSelectMonth(event.target.value);
  }

  handleRevisedSelectChange(event){
    this.props.onRevisedSelectChange(event.target.value);
  }

  handleCountrySelectChange(event){
    this.props.onCountrySelectChange(event.target.value);
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
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <div className={classes.title}>
                  <Typography variant="h6" id="tableTitle">
                    Noticias
                  </Typography>
                </div>
                </Grid>
                <Grid item xs={10}>
                  <div className={classes.form}>
                    <form className={classes.container} noValidate>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                          <TextField
                            id="dateFrom"
                            label="Mes"
                            type="month"                 
                            value={this.props.selectedMonth}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={this.handleMonthChange}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            select
                            className={classes.textField}
                            label="Revisat"
                            value={this.props.isChecked}
                            onChange={this.handleRevisedSelectChange}
                          >
                            <MenuItem value={0}><em>Tots</em></MenuItem>
                            <MenuItem value={1}>Revisats</MenuItem>
                            <MenuItem value={-1}>No revisats</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            select
                            className={classes.textField}
                            label="País"
                            value={this.props.selectedCountry}
                            onChange={this.handleCountrySelectChange}
                          >        
                            <MenuItem value={"Tots"}><em>Tots</em></MenuItem>
                            <MenuItem value={"ES"}>Espanya</MenuItem>
                            <MenuItem value={"DE"}>Alemanya</MenuItem>
                            <MenuItem value={"UK"}>Regne Unit</MenuItem>
                            <MenuItem value={"FR"}>França</MenuItem>
                            <MenuItem value={"IT"}>Itàlia</MenuItem>
                            <MenuItem value={"AT"}>Àustria</MenuItem>
                            <MenuItem value={"NL"}>Holanda</MenuItem>
                            <MenuItem value={"SE"}>Suècia</MenuItem>
                            <MenuItem value={"SZ"}>Suïssa</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={5}>
                          <Paper className={classes.search} elevation={1}>
                            <TextField
                              select
                              className={classes.searchSelect}
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
                        </Grid>
                      </Grid>
                    </form>
                  </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )}
}


NewsSearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsSearchAppBar);