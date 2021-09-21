import React, { Component } from 'react'
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'

const flex = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-evenly'
}

const styles = theme => ({
  root: {
    overflowY:'hidden',
    flexGrow: 1,
    height: 'auto',
    width: 500,
    marginTop: '3em',
    fontFamily: 'Roboto',
  },
  title: {
    marginTop: '2em',
  },
  form: {
    ...flex,
  }
});  

class Dictionary extends Component {
  state = {
    exercises: [
      { id: 1, term: 'Bench Press' },
      { id: 2, term: 'Deadlift' },
      { id: 3, term: 'Squats' }
    ],
    term: ''
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    })

  handleCreate = e => {
    e.preventDefault()

    if (this.state.term) {
      this.setState(({ exercises, term }) => ({
        exercises: [
          ...exercises,
          {
            term,
            id: Date.now()
          }
        ],
        term: ''
      }))
    }
  }

  handleDelete = id =>
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }))

  render() {
    const { term, exercises } = this.state
    const { classes } = this.props

    return (
          <Paper className={classes.root}>
            <Typography variant="h5" align="center" gutterBottom className={classes.title}>
              Diccionari de Termes Turístics
            </Typography>
            <form onSubmit={this.handleCreate} className={classes.form}>
              <TextField
                name="term"
                label="Term"
                value={term}
                onChange={this.handleChange}
                margin="normal"
              />
              <Button type="submit" color="primary" variant="raised">
                Create
              </Button>
            </form>
            <List>
              {exercises.map(({ id, term }) => (
                <ListItem key={id}>
                  <ListItemText primary={term} />
                  <ListItemSecondaryAction>
                    <IconButton
                      color="primary"
                      onClick={() => this.handleDelete(id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
    )
  }
}

export default withStyles(styles)(Dictionary);