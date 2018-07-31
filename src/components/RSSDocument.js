import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


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
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      render() {
        const { classes } = this.props;
        return (
            <table>
                <tr>
                    <td>
                        <label>
                            <input
                                name="isGoing"
                                type="checkbox"
                                checked={this.props.key}
                                onChange={this.handleInputChange} />
                                {this.props.docId}:
                            </label>
                            <br />
                    </td>
                    <td>
                        {this.props.title}
                    </td>
                    <td>
                        <IconButton className={classes.button} aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </td>
                </tr>
            </table>
        );
      }
}
export default withStyles(styles)(RSSDocument);