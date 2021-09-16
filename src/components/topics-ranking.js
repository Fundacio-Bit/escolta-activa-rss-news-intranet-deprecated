/* eslint-disable no-prototype-builtins */
// import React, { Component } from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import RSSSnackbarContent from './rss-snackbar-content'

import ErrorIcon from "@material-ui/icons/Error";
import { baseErrorMessage, getErrorMessage } from "./utils/getErrorMessage.js";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { List, AutoSizer } from "react-virtualized";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    paddingBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  rank1: {
    fontSize: 50,
    textAlign: "left",
  },
  topTopic: {
    fontSize: 50,
    textAlign: "left",
  },
  error: {
    marginTop: theme.spacing(1),
    color: "#e91e63",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export const TopicsRanking = (props) => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });

  const handleTopicClick = props.topicSelect;

  function renderTopic(props) {
    const { index, style } = props;

    return (
      <ListItem
        button
        style={style}
        key={index}
        onClick={() => handleTopicClick(data[index].name)}
      >
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

  // Calculate the topics array and counts.
  useEffect(() => {
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({ error: false, message: "" });
        setLoading(true);
      }
      try {
        axios
          .get(`/rss-news/entries/yearmonth/${props.selectedMonth}/brand/${props.selectedBrand}`)
          .then((results) => {
            if (results.data.results.length > 0) {
              // OK
              setTimeout(() => {
                if (!unmounted) {
                  setErrorStatus({ error: false, message: "" });
                  setLoading(false);
                  const newsWithTopicsArray = results.data.results.filter(
                    (item) => item.hasOwnProperty("topics")
                  );
                  const topicsStringsArray = newsWithTopicsArray.map(
                    (item) => item.topics
                  );
                  const allMonthTopicsArray = topicsStringsArray.length> 0 ? topicsStringsArray.join(",").split(","): [];
                  let topicsObject = {};
                  allMonthTopicsArray.forEach((topic) => {
                    if (topicsObject.hasOwnProperty(topic)) {
                      topicsObject[topic] = topicsObject[topic] + 1;
                    } else {
                      topicsObject[topic] = 1;
                    }
                  });

                  const topicCountsObjectsArray = Object.entries(
                    topicsObject
                  ).map((topicsCount) => {
                    return { name: topicsCount[0], count: topicsCount[1] };
                  });

                  const orderedTopicCountsObjectsArray = topicCountsObjectsArray.sort(
                    (first, second) => {
                      return second.count - first.count;
                    }
                  );
                  setData(orderedTopicCountsObjectsArray);
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

    // Cleanup function.
    return () => (unmounted = true);
  }, [props.selectedMonth, props.selectedBrand]);

  return (
    <div className={classes.tagsContainer}>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size={24} thickness={4} />
        </div>
      ): (
        data.length > 0 ? (
          // https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md#why-is-my-autosizer-setting-a-height-of-0
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                height={data.length * 46}
                width={width}
                rowHeight={46}
                rowCount={data.length}
                rowRenderer={renderTopic}
                overscanRowCount={3}
              />
            )}
          </AutoSizer>
        ):
        (
          <RSSSnackbarContent
            variant="info"
            message="Ha de seleccionar notícies per a obtenir el rànquing!"
          />
        )
      )}
    </div>
  );
};
