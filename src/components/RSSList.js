import React, { Component } from 'react';
import RSSDocument from './RSSDocument';

class RSSList extends Component {
    render () {
      return (
          <form>
                    {this.props.retrievedDocs.map(u => {
                      return (
                        <RSSDocument
                        //TODO:check why are keys for. They should ne unique and cannot be rendered in the DOM
                        // using prop.key
                          key={u._id}
                          docId={u.published}
                          title={u.title}
                        />
                      );
                    })}            

          </form>
      );
    }
  }

  export default RSSList;