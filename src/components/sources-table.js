import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import SourceRow from './source-row';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';


class SourcesList extends Component {
  constructor(props) {
    super(props);
    this.state = {        
        rssSources : [],
    };
  }

  //  Callback that ensures that teh API calls done by this component are executed once it is mounted. 
  componentDidMount() {
    this.retrievedDocumentsList();
  }

//  Call the REST API to get all documents
  retrievedDocumentsList() {
    var self = this;
    axios.get('http://localhost:8000/rss-sources/sources')
    .then((results) => {self.setState({rssSources: results.data})})
  }

  render () {   
    return (
        <FormControl component="fieldset">
        {this.state.rssSources.results &&
                <FormGroup>
                {this.state.rssSources.results.map(u => {
                  if (u.source_id.indexOf(this.props.countrySelectorValue)!== -1 &&
                      (this.props.activeSelectorValue === "" ||
                      u.is_active === (this.props.activeSelectorValue !== 'false'))){
                    return (
                      <SourceRow
                        //TODO:check what are keys for.
                        // They should be unique and cannot be rendered in the DOM using prop.key
                        key={u._id}
                        // published={u.published}
                        // newsCounter={u.news_counter}
                        docId={u._id}
                        isActive={u.is_active}
                        sourceId={u.source_id}
                        source_name={u.source_name}
                        section={u.section}
                      />
                    );
                  }
                })}            
            </FormGroup>
        }
        </FormControl>
      );
    }
  }

  export default  SourcesList;