import React, { Component } from 'react';
import RSSList from './RSSList';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retrievedDocuments: []  
    };
  }


 // Callback that ensures that teh API calls done by this component are executed once it is mounted. 
  componentDidMount() {
    this.retrievedDocumentsList();
  }

 // Call the REST API to get all docuements
  retrievedDocumentsList() {
    $.getJSON('http://localhost:8000/RSSDocs/entries')
      .then(({results}) => this.setState({retrievedDocuments: results}));      
  }

  // Render the results obtained by the API call (using JSX syntax). 
  render() {
    return (
      <div>
        <RSSList retrievedDocs={this.state.retrievedDocuments} />
      </div>
    );
  }
}

export default App;