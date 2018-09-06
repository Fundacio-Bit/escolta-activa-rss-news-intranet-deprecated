import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import RSSDocument from './RSSDocument';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class RSSList extends Component {
    render () {
      const { classes } = this.props;
      return (
          <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
              {this.props.retrievedDocs.map(u => {
                  return (
                    <RSSDocument
                    //TODO:check why are keys for. They should ne unique and cannot be rendered in the DOM
                    // using prop.key
                      key={u._id}
                      published={u.published}
                      selected={u.selected}
                      docId={u._id}
                      title={u.title}
                    />
                  );
              })}            
          </FormGroup>
          </FormControl>
      );
    }
  }

  export default  withStyles(styles)(RSSList);