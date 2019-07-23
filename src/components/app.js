import React, { Component } from 'react';
import RSSAppBar from './rss-app-bar';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Arial'
    ]
  }
});

class App extends Component {
  // Render the results obtained by the API call (using JSX syntax). 
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <RSSAppBar/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;