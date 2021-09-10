import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, TextField, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  title: {
    textAlign: "left",
    flexBasis: "15%",
  },
  // form
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: 0,
  },
  form: {
    flexBasis: "85%",
  },
  textField: {
    minWidth: "12%",
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
  },
  selectMenu: {
    color: "red",
  },
  search: {
    marginLeft: 10,
    display: "flex",
    height: 50,
    marginTop: 7,
  },

  searchSelect: {
    width: "30%",
  },

  input: {
    marginLeft: 8,
    height: 50,
  },

  iconButton: {
    padding: 10,
  },
});

class TopicsSearchAppBar extends Component {
  constructor(props) {
    super(props);

    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
  }

  handleMonthChange(event) {
    this.props.onSelectMonth(event.target.value);
  }

  handleBrandChange(event) {
    this.props.onBrandSelectChange(event.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                Temes
              </Typography>
            </div>
            <div className={classes.form}>
              <form className={classes.container} noValidate>
                <TextField
                  id="month"
                  label="Mes"
                  type="month"
                  value={this.props.selectedMonth}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleMonthChange}
                />

                <TextField
                  select
                  className={classes.searchSelect}
                  value={this.props.selectedBrand}
                  onChange={this.handleBrandChange}
                  variant="filled"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    margin: "dense"
                  }}
                >        
                  <MenuItem value={"Tots"}><em>Tots</em></MenuItem>
                  <MenuItem value={"mallorca"}>Mallorca</MenuItem>
                  <MenuItem value={"menorca"}>Menorca</MenuItem>
                  <MenuItem value={"ibiza"}>Eivissa</MenuItem>
                  <MenuItem value={"formentera"}>Formentera</MenuItem>
                </TextField>
              </form>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopicsSearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicsSearchAppBar);
