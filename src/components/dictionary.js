import React, { useState, useEffect } from 'react'
import axios from "axios";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const flex = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-evenly'
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY:'hidden',
    flexGrow: 1,
    height: 'auto',
    width: 500,
    marginTop: '2em',
    fontFamily: 'Roboto',
  },
  title: {
    marginTop: '2em',
  },
  form: {
    ...flex,
  }
}));

export const Dictionary = (props) => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });

  useEffect(() => {
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({ error: false, message: "" });
        setLoading(true);
      }

      try {
        axios
          .get(`/rss-dictionary/terms`)
          .then((results) => {
            if (results.data.results.length > 0) {
              setTimeout(() => {
                if (!unmounted) {
                  setErrorStatus({ error: false, message: "" });
                  setLoading(false);
                  setData(results.data.results);
                }
              }, 850);
            } else {
              // No data returned
              if (!unmounted) {
                setData([]);
                setLoading(false);
              }
            }
          })
          .catch((error) => {
            console.log(getErrorMessage(error));
            setErrorStatus({ error: true, message: baseErrorMessage });
            setLoading(false);
          });
      } catch (error) {
        if (!unmounted) {
          console.log(getErrorMessage(error));
          setErrorStatus({ error: true, message: baseErrorMessage });
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => (unmounted = true);
  }, []);


  const handleChange = ({ target: { value } }) => {
    setTerm(value)
  }

  const handleCreate = (e) => {
    e.preventDefault();
    if (term.length > 0) {
      axios
      .post("/rss-dictionary/terms/", { term: term, search_mode: "substring" }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        console.log("POST response: ", res);
        setData(data.filter(ex => ex._id !== id))
      });
    }
  }

  const handleDelete = (id) => {
    console.log("Deleting ", id)
    axios.delete('/rss-dictionary/identifier/'+ id)
    .then((res) => {
      setData(data.filter(ex => ex._id !== id))
    })  
  }

  console.log("Rendering dictionary")
  return (
    <div className={classes.root}>
    {errorStatus.error && (
      <div className={classes.error}>
        &nbsp;
        <ErrorIcon style={{ verticalAlign: "middle" }} />
        &nbsp;{errorStatus.message}
      </div>
    )}

    {loading && (
      <div className={classes.loading}>
        <CircularProgress size={24} thickness={4} />
      </div>
    )}

    {!loading && !errorStatus.error && (
      <Paper className={classes.root}>
        <Typography variant="h5" align="center" gutterBottom className={classes.title}>
          Diccionari de Termes Turístics
        </Typography>
        <form onSubmit={handleCreate} className={classes.form}>
          <TextField
            name="term"
            label="Term"
            value={term}
            onChange={handleChange}
            margin="normal"
          />
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </form>
        <List>
          {data.map(({ _id, term }) => (
            <ListItem key={_id}>
              <ListItemText primary={term} />
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  onClick={() => handleDelete(_id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    )}
  </div>
  );
}
