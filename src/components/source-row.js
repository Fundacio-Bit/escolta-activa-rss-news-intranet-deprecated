import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    frequencyColumn: {
        textAlign: 'center',
        }
});
  

class RSSSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [this.props.docId] : this.props.selected,
            // isActive : this.props.isActive
        };
        // This binding is necessary to make `this` work in the callback
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    
    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     var id = ''
    //     Object.keys(this.state).map((key, index) => {
    //         id = key
    //     })            
  
    //     axios.put('/rss-sources/identifier/'+ id +'/selected/' + value )
    //         .then((res) => {
    //             // we can update the state after response...
    //             this.setState({
    //                 [id]: value
    //             });
    //         })
    // }
    
    // handleToggleClick(event) {
    //     axios.put('/rss-sources/identifier/'+ this.props.docId +'/active/' + !this.state.isActive)
    //         .then((res) => {
    //             // we can update the state after response...
    //             this.setState(state => ({
    //                     isActive: !state.isActive
    //                   }));
    //         })
    // }

    render() {
        const { classes } = this.props;
        // const isActive = this.state.isActive
        // const isActive = this.props.isActive
        // const isOperative = this.props.isOperative
        // const frequency = this.props.frequency

        return (
            <TableRow >
                <TableCell>
                <IconButton 
                    className={classes.button} 
                    aria-label="SourceManager" 
                    // onClick={this.handleToggleClick}>
                    onClick = {() => this.props.handleToggleClick(this.props.docId, !this.props.isActive)}>
                    {this.props.isActive ?
                        <Tooltip title="Extracció activa"><PlayArrowIcon /></Tooltip>:
                        <Tooltip title="Extracció incativa"><StopIcon /></Tooltip>}
                </IconButton>
                </TableCell>
                <TableCell>
                    {this.props.sourceName}<br /><a href={this.props.feedUrl} target="_blank">({this.props.section})</a>
                </TableCell>
                <TableCell className={classes.frequencyColumn} >
                    {this.props.isOperative ? this.props.frequency:<ReportProblemIcon />}
                </TableCell>
            </TableRow >
        );
      }
}

RSSSource.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(RSSSource);