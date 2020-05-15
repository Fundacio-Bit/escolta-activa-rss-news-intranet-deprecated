import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { TopicsRanking } from "./topics-ranking";
import TopicsSearchAppBar from "./topics-search-app-bar";
import TopicsBarChart from "./topics-bar-chart";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { baseErrorMessage, getErrorMessage } from "./utils/getErrorMessage.js";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto",
    // flexGrow: 1,
    // width: '100%',
    // height: '100%',
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
    // height: 150,
    // width: 150,
  },
  overviewItem: {
    background: "linear-gradient(60deg, #26c6da, #00acc1)",
    boxShadow:
      "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)",
    width: "150px",
    height: "150px",
    // overflow: "unset",
    // fontSize: "1.5em",
    // textAlign: "center",
    marginBottom: "3px",
  },
  overviewTitle: {
    textAlign: "center",
    fontSize: "1.2em",
    lineHeight: "1.2em",
    color: "white",
    padding: "10px",
    margin: "unset",
    // fontFamily: "Roboto",
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

export const Topics = (props) => {
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var year_month_str = yyyy + "-" + mm;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });
  const [selectedMonth, setSelectedMonth] = useState(year_month_str);
  const [selectedTopic, setSelectedTopic] = useState("all");

  const classes = useStyles();

  const handleTopicClick = (topicName) => {
    setSelectedTopic(topicName);
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
          .get(`/rss-news/entries/yearmonth/${selectedMonth}`)
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
  }, [selectedMonth]);

  // get figures for the overview panel
  const overviewFigures = {
    totalNews: data.length,
    spanishNews: data.filter(
      (entry) =>
        entry.source_id.includes("ES") | entry.source_id.includes("AIR")
    ).length,
    britishNews: data.filter((entry) => entry.source_id.includes("UK")).length,
    germanNews: data.filter((entry) => entry.source_id.includes("DE")).length,
    italianNews: data.filter((entry) => entry.source_id.includes("IT")).length,
    frenchNews: data.filter((entry) => entry.source_id.includes("FR")).length,
    austrianNews: data.filter((entry) => entry.source_id.includes("AT")).length,
    dutchNews: data.filter((entry) => entry.source_id.includes("NL")).length,
    swedishNews: data.filter((entry) => entry.source_id.includes("SE")).length,
    swissNews: data.filter((entry) => entry.source_id.includes("SZ")).length,
    // topicsCount: data.filter((entry) => entry.source_id.includes("ES")).length,
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.test2} spacing={10}>
        <Grid item className={classes.test2} xs={12}>
          <Paper className={classes.paper}>
            <TopicsSearchAppBar
              selectedMonth={selectedMonth}
              onSelectMonth={setSelectedMonth}
            />
          </Paper>
        </Grid>
        <Grid item className={classes.overviewPanel} xs={12}>
          <div className={classes.test4}>
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                <span className={classes.highlightedTitle}>
                  {" "}
                  {selectedMonth}
                  {"   "}
                </span>
                Indicadors globals{" "}
              </Typography>
            </div>
            <Grid item className={classes.overviewPanel} xs={12}>
              <Grid container spacing={6}>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>
                      Notícies seleccionades
                    </p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.totalNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans espanyols</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.spanishNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans britànics</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.britishNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans alemanys</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.germanNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans italians</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.italianNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans francesos</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.frenchNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans austríacs</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.austrianNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans holandesos</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.dutchNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans suecs</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.swedishNews}
                    </p>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.overviewItem}>
                    <p className={classes.overviewTitle}>Mitjans suïssos</p>
                    <p className={classes.overviewFigure}>
                      {overviewFigures.swissNews}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item className={classes.test2} xs={4}>
          <div className={classes.test}>
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                Rànquing de temes
              </Typography>
            </div>
            <TopicsRanking
              selectedMonth={selectedMonth}
              selectedTopic={selectedTopic}
              topicSelect={handleTopicClick}
            />
          </div>
        </Grid>
        <Grid item className={classes.test2} xs={8}>
          <div className={classes.test}>
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                {selectedTopic == "all" ? (
                  "Totes les notícies del mes"
                ) : (
                  <span>
                    Notícies sobre{" "}
                    <span className={classes.highlightedText}>
                      {selectedTopic}
                    </span>{" "}
                  </span>
                )}
              </Typography>
              <TopicsBarChart
                selectedMonth={selectedMonth}
                selectedTopic={selectedTopic}
              ></TopicsBarChart>
            </div>
            {filteredData.length > 0 &&
              filteredData.map((u, index) => {
                return (
                  <a
                    href={u.link}
                    className={classes.newInput}
                    key={index}
                    target="_blank"
                  >
                    <h3>{u.title}</h3>
                  </a>
                );
              })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
