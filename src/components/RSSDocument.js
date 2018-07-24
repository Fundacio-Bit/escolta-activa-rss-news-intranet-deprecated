import React, { Component } from 'react';

class RSSDocument extends Component {
  render () {
    return (
      <li>
        <h1>{this.props.docId}</h1>
        <p>{this.props.title}</p><br></br>
      </li>
    );
  }
}

export default RSSDocument;