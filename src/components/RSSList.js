import React, { Component } from 'react';
import RSSDocument from './RSSDocument';

class RSSList extends Component {
    render () {
      return (
          <ul>
            {this.props.retrievedDocs.map(u => {
              return (
                <RSSDocument
                //TODO:check why are keys for. They should ne unique and cannot be rendered in the DOM
                // using prop.key
                  key={u.published}
                  docId={u.published}
                  title={u.title}
                />
              );
            })}            
          </ul>
      );
    }
  }

  export default RSSList;