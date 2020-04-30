/* eslint-disable no-prototype-builtins */
// import React, { Component } from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import ErrorIcon from "@material-ui/icons/Error";
import { baseErrorMessage, getErrorMessage } from "./utils/getErrorMessage.js";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple, red } from "@material-ui/core/colors";
import { NonceProvider } from "react-select";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vmax',
    paddingTop: 30,
    paddingBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    // minWidth: '20%',
    // maxWidth: '35%',
    backgroundColor: theme.palette.background.paper,
    border: "#e3dee3",
    borderWidth: "2px",
    borderStyle: "solid",
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
  topicNew: {
    textAlign: "left",
    textDecoration: "none",
  },
  error: {
    marginTop: theme.spacing(1),
    color: "#e91e63",
  },
  loading: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  tagsContainer: {
    fontWeight: 200,
    marginLeft: "20px",
    border: "#e3dee3",
    borderWidth: "2px",
    borderStyle: "solid",
    backgroundColor: deepOrange[500],
    background: deepOrange[500],
  },
}));

export const TopicsNews = (props) => {
  const classes = useStyles();

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

  return (
    <div className={classes.tagsContainer}>
      {data.length > 0 &&
        data.map((u) => {
          return (
            <a href={u.link} className={classes.topicNew} target="_blank">
              <h3>{u.title}</h3>
            </a>
          );
        })}
      ;
    </div>
  );
};

// https://material-ui.com/es/components/avatars/
// https://material-ui.com/es/components/chips/
// https://material-ui.com/es/components/lists/
// https://material-ui.com/es/components/typography/
// https://material-ui.com/es/customization/typography/

// {!loading && !errorStatus.error &&
//   <Paper className={classes.root}>
//   <div className={classes.tableWrapper}>
//   <Table className={classes.table} aria-labelledby="tableTitle">
//       {filteredData.length > 0 && (
//         <TopicsTableHead
//           order = { order }
//           orderBy = { orderBy }
//         />
//       )}
//       <TableBody>
//       {filteredData.length > 0 && filteredData.map(u => {
//         return (
//           <TopicsTableRow
//             key= { u.name }
//             topic = { u.name }
//             count = { u.count }
//           />
//         );
//       })}
//       {filteredData.length === 0 && (
//         <TableRow>
//           <TableCell colSpan={4}>
//             <RSSSnackbarContent
//               variant="info"
//               className={classes.margin}
//               message="No hi ha dades per a aquesta cerca!"
//             />
//           </TableCell>
//         </TableRow>
//       )}
//       </TableBody>
//     </Table>
//   </div>
// </Paper>
// }
