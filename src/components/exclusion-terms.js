import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const flex = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-evenly",
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "hidden",
    flexGrow: 1,
    height: "auto",
    width: 500,
    marginTop: "2em",
    fontFamily: "Roboto",
  },
  title: {
    marginTop: "2em",
  },
  form: {
    ...flex,
  },
}));

export const ExclusionTerms = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      console.log("Fetching data")
      try {
        axios
        .get(`/rss-exclusion-terms/terms`)
        .then((results) => {
          if (results.data.results.length > 0) {
            setTimeout(() => {
              if (isMounted) {
                let orderedData = results.data.results.sort((a,b) => (a.term > b.term) ? 1 : ((b.term > a.term) ? -1 : 0))
                setErrorStatus({ error: false, message: "" });
                setLoading(false);
                setData(orderedData);
              }
            }, 850);
          } else {
            if (isMounted) {
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
        if (isMounted) {
          console.log(getErrorMessage(error));
          setErrorStatus({ error: true, message: baseErrorMessage });
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, []);

  const handleChange = ({ target: { value } }) => {
    setTerm(value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (term.length > 0) {
      axios
        .post(
          "/rss-exclusion-terms/terms/",
          { term: term, search_mode: "substring" },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          const new_data = data.concat(res.data.success);
          setData(new_data);
          setTerm('');
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete("/rss-exclusion-terms/identifier/" + id).then((res) => {
      setData(data.filter((item) => item._id !== id));
      setTerm('');
    });
  };

  let filteredData= data.filter((item) => item.term.toLowerCase().includes(term.toLowerCase()))
  // console.log("Rendering dictionary: ", filteredData);

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
        <Paper className={classes.root}>
          <div className={classes.loading}>
            <CircularProgress size={24} thickness={4} />
          </div>
        </Paper>
      )}

      {!loading && !errorStatus.error && (
        <Paper className={classes.root}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            className={classes.title}
          >
            Termes d'exclusió
          </Typography>
          <form onSubmit={handleCreate} className={classes.form}>
            <TextField
              name="term"
              label="Term"
              value={term}
              onChange={handleChange}
              margin="normal"
              maxLength={30}
            />
            <Button type="submit" color="primary" variant="contained">
              Afegir
            </Button>
          </form>
          <List>
            {filteredData.length > 0 && filteredData.map(({ _id, term }) => (
              <ListItem key={_id}>
                <ListItemText primary={term} />
                <ListItemSecondaryAction>
                  <IconButton color="primary" onClick={() => handleDelete(_id)}>
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
};
