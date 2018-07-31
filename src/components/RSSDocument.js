import React, { Component } from 'react';
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
          isGoing: false,
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        // This binding is necessary to make `this` work in the callback
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log('handleInputChange was clicked: ' + value);
    
        this.setState({
          [name]: value
        });
    }
    
    handleDeleteClick(event) {
        const target = event.target;
        const name = target.name;
        // e.preventDefault();
        console.log('The link was clicked: ' + name);
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
                                    checked={this.props.key} 
                                    onChange={this.handleInputChange} 
                                    value={this.props.key} />
                            }
                            label= {this.props.docId}
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