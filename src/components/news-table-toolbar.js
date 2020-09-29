import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          width: '100%',
          // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          width: '100%',
          // backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

export const NewsTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, handleDeleteClick } = props;

  return (
    <Toolbar 
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : <br/>}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" 
            onClick= 
            {() => {handleDeleteClick()}
            }>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : <br/>}
    </Toolbar>
  );
};

NewsTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
