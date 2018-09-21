import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
  

class RSSSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [this.props.docId] : this.props.selected,
            isActive : this.props.isActive
        };
        // This binding is necessary to make `this` work in the callback
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    
    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     var id = ''
    //     Object.keys(this.state).map((key, index) => {
    //         id = key
    //     })            
  
    //     axios.put('http://localhost:8000/rss-sources/identifier/'+ id +'/selected/' + value )
    //         .then((res) => {
    //             console.log(res)
    //             // we can update the state after response...
    //             this.setState({
    //                 [id]: value
    //             });
    //         })
    // }
    
    handleToggleClick(event) {

        // this.setState(state => ({
        //     isActive: !state.isActive
        //   }));

        
        axios.put('http://localhost:8000/rss-sources/identifier/'+ this.props.docId +'/active/' + !this.state.isActive)
            .then((res) => {
                // we can update the state after response...
                console.log(res);                
                this.setState(state => ({
                        isActive: !state.isActive
                      }));
            })
    }

    render() {
        const { classes } = this.props;
        const isActive = this.state.isActive
        return (
            <TableRow >
                    <TableCell>
                    <IconButton 
                        className={classes.button} 
                        aria-label="SourceManager" 
                        onClick={this.handleToggleClick}>
                        {isActive ? (<PlayArrowIcon />):(<StopIcon />)}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {this.props.source_name}<br />({this.props.section})
                </TableCell>
                <TableCell>
                    ({this.props.newsCounter} notícies)
                </TableCell>
            </TableRow >
        );
      }
}

RSSSource.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(RSSSource);