import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
  

class RSSDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [this.props.docId] : this.props.selected,
        };
        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        var id = ''
        Object.keys(this.state).map((key, index) => {
            id = key
        })            
  
        axios.put('http://localhost:8000/rss-news/identifier/'+ id +'/selected/' + value )
            .then((res) => {
                console.log(res)
                // we can update the state after response...
                this.setState({
                    [id]: value
                });
            })
    }
    
    handleDeleteClick(event) {
        // axios.delete('http://localhost:8000/rss-news/identifier/', {params: {'documentId': id}})
        axios.delete('http://localhost:8000/rss-news/identifier/'+ this.props.docId)
            .then((res) => {
                console.log(res)
                // we can update the state after response...
                // self.setState({selectedBook:selectedBook})
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <table>
            <tbody>
                <tr>
                    <td>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={this.state[this.props.docId]}
                                    onChange={this.handleInputChange} 
                                    value={String(this.props.selected)} />
                            }
                            label= {this.props.published}
                        />
                        {/* <label>
                            <input
                                name="isGoing"
                                type="checkbox"
                                checked={this.props.key}
                                onChange={this.handleInputChange} />
                                {this.props.docId}:
                            </label>
                            <br /> */}
                    </td>
                    <td>
                        {this.props.title}
                    </td>
                    <td>
                        <IconButton 
                            className={classes.button} 
                            aria-label="Delete" 
                            onClick={this.handleDeleteClick} >
                            <DeleteIcon />
                        </IconButton>
                    </td>
                </tr>
            </tbody>
            </table>
        );
      }
}
export default withStyles(styles)(RSSDocument);