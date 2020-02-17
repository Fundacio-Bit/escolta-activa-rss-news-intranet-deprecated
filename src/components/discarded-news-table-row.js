import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import RestoreIcon from '@material-ui/icons/Restore';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme => ({
    // button: {
    //   margin: theme.spacing(y),
    // },
    chip: {
      // margin: theme.spacing(y),
      fontSize: "0.8rem",
      height:"23px",
      padding:"2px 2px 2px 2px",
    },
    dateTableCell: {
      width: 90,
    },
    tooltipContainer:{
      overflow: 'visible'
    },
    customizedTooltip: {
      fontSize: 14,
      maxWidth: 400,
      marginRight: 50
    },
    root: {
      overflowY:'hidden',
      flexGrow: 1,
      height: 290,
      width: 500,
    },
    input: {
      display: 'flex',
      padding: 0,
    },  
  });  

    
  class DiscardedNewsTableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // open: false,
        assignedTopics: this.props.topics,
        // textFieldValue: "",
        isLoading: this.props.isUpdating
      };
    }

  
    render () {
      const { classes } = this.props;
      const isLoading = this.state.isLoading;

      var handleRestoreClick  =   this.props.handleRestoreClick;
          
      return (
          <TableRow 
          role="checkbox"
        >
          <TableCell><div><h3>{new Date(this.props.published).toLocaleString()}</h3></div></TableCell>
          <TableCell>
            <div>
              <Tooltip
                classes={{ tooltip: classes.customizedTooltip }}
                title={
                  <React.Fragment>
                    <p>{this.props.summary.length > 600 ? `${this.props.summary.slice(0,600)}...`: this.props.summary}</p>
                    <p><strong>{this.props.source_name}</strong> - {this.props.section}</p>
                    <p>Marca: <strong>{this.props.brand}</strong></p>
                  </React.Fragment>}
                enterDelay={500}
                leaveDelay={200}
                placement='bottom'>
                <a href={this.props.link}  style={{ textDecoration: 'none' }} target="_blank"><h3>{this.props.title}</h3></a>
              </Tooltip>
            </div>
            <div>
              {this.props.topics.map(u=>{if (u!=="") {
                return <Chip
                    label={u}
                    key= {u}
                    color="primary"
                    disabled
                    className={classes.chip}
                  />}})}
            </div>
          </TableCell>
          <TableCell>
            { isLoading && <div>
              <div className={classes.loading}>
              <CircularProgress size={24} thickness={4} />
              </div>
            </div>}
            { !isLoading && <IconButton 
              className={classes.button} 
              aria-label="Restore" 
              onClick= 
                { () => {
                  this.setState(
                    { isLoading: true })
                  handleRestoreClick(this.props.docId)
                  }  
                }>
              <RestoreIcon />
            </IconButton>}
          </TableCell>
        </TableRow>
      );
  }
}

DiscardedNewsTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  export default withStyles(styles, {
    withTheme: true
  })(DiscardedNewsTableRow);