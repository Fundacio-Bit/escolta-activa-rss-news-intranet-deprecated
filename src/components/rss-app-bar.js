import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Popover, MenuItem} from "@material-ui/core";
import News from './news';
import DiscardedNews from './discarded-news';
import Graphs from './graphs';
import FilterableSourcesTable from './filterable-sources-table';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const styles = {
    root: {
        flexGrow: 1,
    },
    appBar: {
        flexWrap: 'wrap',
    },
    tabs: {
        width: '100%',
    },
    Tab: {
        flexDirection: "row-reverse"
    }
};



class RSSAppBar extends Component {
  
  // state = {
  //   value: 0,
  // };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      anchorEl: null
    };
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }
  
  handleChange(event, value) {
    this.setState({ value });
  };

  handleClick(event) {
    event.stopPropagation();
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null
    });
  }

  handleMenuItemClick(menuItem) {
    this.handleClose();
    this.setState({
      // label: menuItem,
      // content: menuItem,
      value: menuItem
    });
  }

  render () {
    const { classes } = this.props;
    const { value } = this.state;
    const open = Boolean(this.state.anchorEl);
    
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          className={classes.appBar}
        >
          <Tabs className={classes.tabs} value={value} onChange={this.handleChange}>
              <Tab
                  label="NOTICIAS" 
                  classes = {{wrapper: classes.Tab}}
                  value = {0}
                  icon = {< ArrowDropDownIcon onClick = {this.handleClick}/>}
                  onClick = {() => this.setState({content: "NOTICIAS"})
                }
            />
            <Tab label="FUENTES" />
            <Tab label="GRAPHS" />
          </Tabs>
        </AppBar>
        {value === 0 && <News/>}
        {value === 1 && <FilterableSourcesTable/>}
        {value === 2 && <Graphs/>}
        {value === 3 && <DiscardedNews/>}
        <Popover
          open = {open}
          anchorEl = {this.state.anchorEl}
          onClose = {this.handleClose}
          anchorOrigin = {
            {
              vertical: "bottom",
              horizontal: "center"
            }
          }
          transformOrigin = {
            {
              vertical: "top",
              horizontal: "center"
            }
          }
        >
          <MenuItem onClick = {() => this.handleMenuItemClick(0)}>
            Noticias
          </MenuItem>
          <MenuItem onClick = {() => this.handleMenuItemClick(3)}>
            Noticias descartadas
          </MenuItem>
        </Popover>
      </div>
    )
  }
}

RSSAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RSSAppBar);
