import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import News from './news';
import FilterableSourcesTable from './filterable-sources-table';

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
};


class RSSAppBar extends Component {
  
  // state = {
  //   value: 0,
  // };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event, value) {
    this.setState({ value });
  };

  render () {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          className={classes.appBar}
        >
          <Tabs className={classes.tabs} value={value} onChange={this.handleChange}>
            <Tab label="FUENTES" />
            <Tab label="NOTICIAS" />
          </Tabs>
        </AppBar>
        {value === 0 && <FilterableSourcesTable/>}
        {value === 1 && <News/>}
       </div>
    )
  }
}

RSSAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RSSAppBar);
