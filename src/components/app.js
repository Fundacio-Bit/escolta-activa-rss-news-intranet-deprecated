import React, { Component } from 'react';
import RSSAppBar from './rss-app-bar';
import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

// TODO: minimize bundle size:
// https://material-ui.com/es/guides/minimizing-bundle-size/

// Migration to Typography 2
// https://v3.material-ui.com/style/typography/#migration-to-typography-v2
const theme = createTheme ({
  
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto'
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