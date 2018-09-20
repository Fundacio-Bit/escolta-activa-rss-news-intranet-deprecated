import React, { Component } from 'react';
import FilterableSourcesTable from './filterable-sources-table';

class App extends Component {
  // Render the results obtained by the API call (using JSX syntax). 
  render() {
    return (
      <div>
        <FilterableSourcesTable/>
      </div>
    );
  }
}

export default App;