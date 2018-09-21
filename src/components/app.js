import React, { Component } from 'react';
import RSSAppBar from './rss-app-bar';

class App extends Component {
  // Render the results obtained by the API call (using JSX syntax). 
  render() {
    return (
      <div>
        <RSSAppBar/>
      </div>
    );
  }
}

export default App;