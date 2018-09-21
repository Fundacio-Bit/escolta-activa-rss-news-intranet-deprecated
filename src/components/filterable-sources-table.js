import React, { Component } from 'react';
import SourcesTable from './sources-table';
import SearchBar from './search-bar';


class FilterableSourcesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryISOCode: '',
      activeFilter: '' 
    };
    
    // This binding is necessary to make `this` work in the callback
    this.handleCountrySelectorChange = this.handleCountrySelectorChange.bind(this);
    this.handleActiveSelectorChange = this.handleActiveSelectorChange.bind(this);     
  }

  handleCountrySelectorChange(countrySelectorChoice){
    this.setState({ countryISOCode: countrySelectorChoice });
  };

  handleActiveSelectorChange(activeFilterSelectorChoice){
    this.setState({ activeFilter: activeFilterSelectorChoice });
  };

 
  render () {
    const { classes } = this.props;
    return (
      <div>
        <SearchBar
          countryISOCode={this.state.countryISOCode}
          onCountrySelectorChange={this.handleCountrySelectorChange}
          activeFilter={this.state.activeFilter}
          onActiveSelectorChange={this.handleActiveSelectorChange}
        />
          <SourcesTable
          countrySelectorValue = {this.state.countryISOCode}
          activeSelectorValue = {this.state.activeFilter}/>     
      </div>        
      );
    }
  }

  export default FilterableSourcesTable;