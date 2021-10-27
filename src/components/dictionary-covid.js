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
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import {
  InputLabel,
  Select,
  MenuItem,
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

export const DictionaryCovid = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [mode, setMode] = useState("subcadena");
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      console.log("Fetching data")
      try {
        axios
        .get(`/rss-dictionary-covid/terms`)
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

  const handleChangeTerm = ({ target: { value } }) => {
    setTerm(value);
  };

  const handleChangeMode = ({ target: { value } }) => {
    setMode(value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (term.length > 0) {
      axios
        .post(
          "/rss-dictionary-covid/terms/",
          { term: term, search_mode: mode },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          const new_data = data.concat(res.data.success);
          setData(new_data);
          setTerm('');
          setMode('subcadena');
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete("/rss-dictionary-covid/identifier/" + id).then((res) => {
      setData(data.filter((item) => item._id !== id));
      setTerm('');
      setMode('subcadena');
    });
  };

  var filteredData= data.filter((item) => item.term.toLowerCase().includes(term.toLowerCase()))
  // if (mode !== 'tots')
  //   filteredData= data.filter((item) => item.search_mode == mode)

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
            Diccionari de Termes Covid
          </Typography>
          <form onSubmit={handleCreate} className={classes.form}>
            <TextField
              name="term"
              label="Terme"
              value={term}
              onChange={handleChangeTerm}
              margin="normal"
              maxLength={30}
            />
            <InputLabel id="mode-select-label">Tipus</InputLabel>
            <Select
              labelId="mode-select-label"
              id="mode-select"
              value={mode}
              onChange={handleChangeMode}
            >
              {/* <MenuItem value="tots">Tots</MenuItem> */}
              <MenuItem value="subcadena">subcadena</MenuItem>
              <MenuItem value="exacte">exacte</MenuItem>
            </Select>

            <Button type="submit" color="primary" variant="contained">
              Afegir
            </Button>
          </form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Terme</TableCell>
                <TableCell align="left">Tipus</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredData.length > 0 && filteredData.map(({ _id, term, search_mode }) => (
              <TableRow key={_id}>
                <TableCell align="left">{term}</TableCell>
                <TableCell align="left">{search_mode}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleDelete(_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
};
