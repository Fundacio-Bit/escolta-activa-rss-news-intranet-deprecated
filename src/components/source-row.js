import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

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
            <table>
            <tbody>
                <tr>
                    {/* <td>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={this.state[this.props.docId]}
                                    onChange={this.handleInputChange} 
                                    value = "true"
                                    value={String(this.props.selected)}
                                     />
                            }
                               />
            
                    </td> */}
                    <td>
                        <IconButton 
                            className={classes.button} 
                            aria-label="SourceManager" 
                            onClick={this.handleToggleClick}>
                            {isActive ? (<PlayArrowIcon />):(<StopIcon />)}
                        </IconButton>
                    </td>
                    <td>
                        {this.props.source_name}<br />({this.props.section})
                    </td>
                    <td>
                        ({this.props.newsCounter} notícies)
                    </td>
                </tr>
            </tbody>
            </table>
        );
      }
}
export default withStyles(styles)(RSSSource);