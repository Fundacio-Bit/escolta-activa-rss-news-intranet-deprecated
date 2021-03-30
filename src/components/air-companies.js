import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import TopicsSearchAppBar from "./topics-search-app-bar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Button from '@material-ui/core/Button';
import { baseErrorMessage, getErrorMessage } from "./utils/getErrorMessage.js";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue, pink } from "@material-ui/core/colors";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "left",
    flexBasis: "15%",
    marginBottom: "1em",
  },
  topicsPaper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  highlightedTitle: {
    fontWeight: "bold",
    color: "#26c6da",
    fontSize: "1.5em",
  },
  highlightedText: {
    fontWeight: "bold",
    color: "#26c6da",
    fontSize: "1em",
  },
  overviewPanel: {
    justifyContent: "left",
    padding: "unset!important",
    paddingBottom: "10px!important",
    width: "100%",
    margin: "unset",
  },
  overviewItem: {
    textAlign: "center",
    background: "linear-gradient(60deg, #26c6da, #00acc1)",
    boxShadow:
      "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)",
    width: "150px",
    height: "150px",
    marginBottom: "3px",
  },
  overviewTitle: {
    textAlign: "center",
    fontSize: "1.2em",
    lineHeight: "1.2em",
    color: "white",
    padding: "10px",
    margin: "unset",
  },
  overviewFigure: {
    textAlign: "center",
    fontSize: "3em",
    fontWeight: "bold",
    color: "white",
    padding: "5px",
    margin: "unset",
    fontFamily: "Roboto",
  },
  newInput: {
    color: "#898d91",
    textDecoration: "unset",
    fontWeight: "500",
    "&:hover": {
      textDecoration: "underline",
      fontWeight: "600",
      color: "#3f51b5",
    },
  },
  topicsGridxs12: {
    display: "flex",
    padding: "unset",
    flexBasis: "100%",
  },
  topicsGridSection: {
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    margin: "20px 0px 0px 0px",
    width: "100%",
    padding: "unset",
  },
  topicsGridContainer: {
    margin: "20px 0px 0px 0px",
    width: "100%",
    padding: "unset",
    flexBasis: "100%",
  },
  rankingsPanel: {
    flexBasis: "34%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    margin: "20px 0px 0px 0px",
    width: "100%",
    padding: "unset",
  },
  newsPanel: {
    flexBasis: "64%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    margin: "20px 0px 0px 0px",
    width: "100%",
    padding: "unset",
  },
  gridDivider: {
    flexBasis: "2%",
    margin: "20px 0px 0px 0px",
    width: "100%",
    padding: "unset",
  },
  test: {
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.4), 0px 1px 1px 0px rgba(0,0,0,0.28), 0px 1px 7px 0px rgba(0,0,0,0.24)",
    height: "100%",
    margin: "1em",
    padding: "1em",
  },
  test2: {
    padding: "unset!important",
    paddingBottom: "10px!important",
    width: "100%",
    margin: "unset",
  },
  test3: {
    boxShadow:
      "0px 3px 2px -2px rgba(0,0,0,0.4), 0px 2px 2px 0px rgba(0,0,0,0.28), 0px 2px 5px 0px rgba(0,0,0,0.24)",
    height: "100%",
  },
  test4: {
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.4), 0px 1px 1px 0px rgba(0,0,0,0.28), 0px 1px 7px 0px rgba(0,0,0,0.24)",
    margin: "1em",
    padding: "1em",
  },
}));

export const AirCompanies = (props) => {
  const [open, setOpen] = React.useState(false);
  const [currentId, setCurrentId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });
  const [selectedMonth, setSelectedMonth] = useState(year_month_str);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const classes = useStyles();

  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var year_month_str = yyyy + "-" + mm;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (event) => {
    // console.log('Open Dialog: ', event.currentTarget.id)
    setCurrentId(event.currentTarget.id);
    setOpen(true);
  };

  const handleDownload = (event) => {
    event.preventDefault();
    // console.log('Download ZIP: ', currentId)
    const link = document.getElementById(currentId);
    link.href = `/rss-air-companies/download-csv/week/${currentId}`;
    link.click();
    setCurrentId("");
    setOpen(false);
  };

  function renderTopic(props) {
    const { index, style } = props;

    return (
      <ListItem button style={style} key={index}>
        <ListItemAvatar>
          <Avatar className={index > 3 ? classes.orange : classes.purple}>
            {index + 1}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${data[index].name} ${data[index].count}`} />
      </ListItem>
    );
  }

  renderTopic.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  // node /home/ubuntu/fbit_projects/escolta_activa/covid-tourism-rss-news-reporting/main.js --date lastWeek --mode prod
  const filterByTopic = (pressNew) => {
    if (
      pressNew.hasOwnProperty("topics") &&
      pressNew.topics
        .toLowerCase()
        .split(",")
        .includes(selectedTopic.toLowerCase())
    ) {
      return true;
    } else return false;
  };

  let filteredData = selectedTopic == "all" ? data : data.filter(filterByTopic);

  // Get the news related to a topic.
  useEffect(() => {
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({ error: false, message: "" });
        setLoading(true);
      }

      try {
        axios
          .get("/rss-air-companies/folders")
          .then((results) => {
            if (results.data.results.length > 0) {
              // OK
              // Beware with this:
              // https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-event-handlers
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

    // Cleanup function. useEffect uses the cleanup function to execute operations useful on component unmount.
    return () => (unmounted = true);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container className={classes.test2} spacing={10}>
        <Grid item className={classes.overviewPanel} xs={12}>
          <div className={classes.test4}>
            <Grid item className={classes.overviewPanel} xs={12}>
              <Grid container spacing={6}>
                {data.length > 0 &&
                  data.map((file) => {
                    return (
                      <Grid item key={file.name}>
                        <div className={classes.overviewItem}>
                          <p className={classes.overviewTitle}>{file.name}</p>
                          <a
                            // href={`/rss-covid-tourism/download-zip/week/${file.name}`}
                            id={file.name}
                            href="#"
                            onClick={handleClickOpen}
                          >
                            <i
                              className="fas fa-file-download"
                              style={{
                                paddingTop: "5px",
                                fontSize: "3em",
                                lineHeight: "3em",
                                color: "white",
                              }}
                            ></i>
                          </a>
                          <p className={classes.overviewTitle}>CSV</p>
                        </div>
                      </Grid>
                    );
                  })}
              </Grid>
              <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <MuiDialogTitle disableTypography className={classes.root}>
                  <Typography variant="h6">
                    "Descàrrega / Generació CSV"
                  </Typography>
                  <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </MuiDialogTitle>
                {/* <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  "Descàrrega / Generació ZIP"
                </DialogTitle> */}
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Voleu descarregar el fitxer CSV?
                  </DialogContentText>
                  {loadingSpinner && (
                    <div className={classes.loading}>
                      <CircularProgress size={24} thickness={4} />
                    </div>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDownload} color="primary">
                    Descarregar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
