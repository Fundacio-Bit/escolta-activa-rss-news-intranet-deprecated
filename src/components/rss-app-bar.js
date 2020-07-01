import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Popover, MenuItem } from "@material-ui/core";
import News from "./news";
import DiscardedNews from "./discarded-news";
import { CovidTourism } from "./covid-tourism";
import Graphs from "./graphs";
import FilterableSourcesTable from "./filterable-sources-table";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    flexWrap: "wrap",
  },
  tabs: {
    width: "100%",
  },
  Tab: {
    flexDirection: "row-reverse",
  },
};

class RSSAppBar extends Component {
  // state = {
  //   value: 0,
  // };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      content: <News />,
      anchorEl: null,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleClick(event) {
    event.stopPropagation();
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  handleMenuItemClick(menuItem) {
    this.handleClose();
    var content = null;
    if (menuItem === 0) {
      content = <News />;
    } else if (menuItem === 3) {
      content = <DiscardedNews />;
    }
    this.setState({
      // label: menuItem,
      content: content,
      value: 0,
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={this.handleChange}
          >
            <Tab
              label="NOTÍCIES"
              classes={{ wrapper: classes.Tab }}
              value={0}
              icon={<ArrowDropDownIcon onClick={this.handleClick} />}
              onClick={() => this.setState({ content: <News /> })}
            />
            <Tab
              label="FONTS"
              value="1"
              onClick={() =>
                this.setState({ content: <FilterableSourcesTable /> })
              }
            />
            {/* <Tab label="GRÀFIQUES" value="2"
              onClick={() => this.setState({ content: <Graphs/> })}/> */}
            <Tab
              label="TEMES"
              value="3"
              onClick={() => this.setState({ content: <Topics /> })}
            />
            <Tab
              label="COVID-TOURISM"
              value="4"
              onClick={() => this.setState({ content: <CovidTourism /> })}
            />
          </Tabs>
        </AppBar>
        {/* {value === 0 && <News/>}
        {value === 1 && <FilterableSourcesTable/>}
        {value === 2 && <Graphs/>}
        {value === 3 && <DiscardedNews/>} */}
        {this.state.content}
        <Popover
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={() => this.handleMenuItemClick(0)}>
            Notícies
          </MenuItem>
          <MenuItem onClick={() => this.handleMenuItemClick(3)}>
            Descartades
          </MenuItem>
        </Popover>
      </div>
    );
  }
}

RSSAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RSSAppBar);
