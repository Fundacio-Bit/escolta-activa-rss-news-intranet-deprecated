/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from "react";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import _ from "lodash";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";
import  { getNewsWithCategory } from "./utils/getNewsWithCategory.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  input: {
    display: "none",
  },
  error: {
    marginTop: theme.spacing(1),
    color: "#e91e63",
  },
  loading: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
}));

var desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

var getSorting = (orderBy, order) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

export const NewsTable = (props) => {
  const classes = useStyles();

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("published");
  const [data, setData] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());

  const [selected, setSelected] = useState([]);
  
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState(SortDirection.ASC);
  const [sortedList, setSortedList] = useState([]);
  // sortList( sortBy, sortDirection )

  useEffect(() => {
    let unmounted = false;
  
    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({ error: false, message: "" });
        setLoading(true);
      }
  
      try {
        axios
          .get(`/rss-news/entries/yearmonth/${props.selectedMonth}`)
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
                  setSelected([]);
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
  
    // Cleanup function. useEffect uses the cleanup function to execute operations useful on set unmount.
    // It is equivalent to the componentWillUnmount function of class components.
    // Here it is used to avoid the execution of setData on unmounted components.
    // Further info at:
    // https://en.reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => (unmounted = true);
  }, [lastUpdateTimestamp, props.selectedMonth]);

  // Second useEffect. To retrieve the topics array. Executes on mounting and each time that "allTopics" changes.
  useEffect(() => {
    let unmounted = false;

    const fetchData = () => {
      try {
        axios
          .get("/rss-topics/topics")
          .then((results) => {
            if (results.data.results.length > 0) {
              // OK
              setAllTopics(results.data.results);
            }
          })
          .catch((error) => {
            console.log(getErrorMessage(error));
          });
      } catch (error) {
        if (!unmounted) {
          console.error(error);
        }
      }
    };

    fetchData();

    // Cleanup function. Here it is used to avoid the execution of setAllTopics on unmounted components.
    return () => (unmounted = true);
  }, [lastUpdateTimestamp]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // TODO: handle the addition of topics with special chars or commas. Also avoid duplicates.
  const handleUpdateTopics = (id, topicsString) => {
    let retrievedNews = data;
    const index = retrievedNews.findIndex((x) => x._id == id);
    var processedTopicsString =
      topicsString == "" ? "%20" : topicsString.toString().toLowerCase();

    // TODO: update via POST instead of via put to avoid problems with long URLS and with special chars
    axios
      .put("/rss-news/identifier/" + id + "/topics/" + processedTopicsString)
      .then((res) => {
        retrievedNews[index].topics =
          processedTopicsString == "%20" ? "" : processedTopicsString;
        // Update the state after response
        // We have used an "update timestamp" to trigger rerenders
        setLastUpdateTimestamp(Date.now());
      });
  }

  const handleRequestSort = (orderByReq, order) => {
    let newOrder = "desc";

    if (orderBy === orderByReq && order === "desc") {
      newOrder = "asc";
    }

    setOrder(newOrder);
    setOrderBy(orderByReq);
  }

  // const handleChangePage = (event, page) => {
  //   setPage(page);
  // }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(event.target.value);
  // }

  const handleDeleteClick = () => {
    axios
      .post("/rss-discarded-news/news-discarded/", selected, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        axios.delete("/rss-news/identifiers/" + selected).then((res) => {
          // Update the state after response
          // We have used an "update timestamp" to trigger rerenders
          setLastUpdateTimestamp(Date.now());
        });
      });
  }


  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  const filterByCountry = (pressNew) => {
    if (
      pressNew.hasOwnProperty("source_id") &&
      pressNew.source_id.includes(props.selectedCountry)
    ) {
      return true;
    } else return false;
  }

  const filterByProject = (pressNew) => {
    if (
      pressNew.hasOwnProperty("category") &&
      pressNew.category.find(o => o.name === props.selectedProject)
      // pressNew.category.includes(props.selectedProject)
    ) {
      return true;
    } else return false;
  }


  const filterByChecked = (pressNew) => {
    if (props.isChecked === 1 && pressNew.hasOwnProperty("topics")) return true;
    else if (props.isChecked === -1 && !pressNew.hasOwnProperty("topics"))
      return true;
    else if (props.isChecked === 0) return true;
    else return false;
  }

  const filterByTopic = (pressNew) => {
    if (
      pressNew.hasOwnProperty("topics") &&
      pressNew.topics
        .toLowerCase()
        .split(",")
        .includes(props.searchTerm.toLowerCase())
    ) {
      return true;
    } else return false;
  }

  // Funciona la búsqueda por término si antes haces una por topic

  // TODO: add search in full text
  const filterBySearchTerm = (pressNew) => {
    if (
      pressNew.hasOwnProperty("title") &&
      pressNew.title.toLowerCase().indexOf(props.searchTerm.toLowerCase()) !==
        -1
    ) {
      return true;
    } else return false;
  }

  // Filtering data
  let filteredData = getNewsWithCategory(data.slice());
  let tableData = filteredData.map((doc) => {
    const date = new Date(doc.published).toLocaleString();
    doc.published = date; 
    return doc;
  })
  console.log("Table data: ", tableData)

  if (props.isChecked) {
    filteredData = filteredData.filter(filterByChecked);
  }
  if (props.selectedCountry) {
    if (props.selectedCountry != "Tots") {
      filteredData = filteredData.filter(filterByCountry);
    }
  }
  if (props.selectedProject) {
    if (props.selectedProject != "Tots") {
      filteredData = filteredData.filter(filterByProject);
    }
  }
  if (props.searchType === 0) {
    filteredData = filteredData.filter(filterBySearchTerm);
  } else if (props.searchType === 1 && props.searchTerm !== "") {
    filteredData = filteredData.filter(filterByTopic);
  }

  // // Sorting data
  // filteredData.sort(getSorting(orderBy, order));
  // const sortList = ( sortBy, sortDirection ) => {
  //   let newList = _.sortBy(filteredData, [sortBy]);
  //   if (sortDirection === SortDirection.DESC) {
  //     newList.reverse();
  //   }
  //   return newList;
  // };

  const sort = ( sortBy, sortDirection ) => {
    console.log("Hola")
    // console.log("Sorted list: ", sortedList)
    const sortedList = sortList( sortBy, sortDirection );
    setSortBy(sortBy);
    setSortDirection(sortDirection);
    setSortedList(sortedList);
  };

  // Sorting data
  // filteredData.sort(getSorting(orderBy, order));
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // const Row = ({ index, style, data }) => {
  //   const {
  //     filteredData,
  //     allTopics,
  //     handleClick,
  //     handleUpdateTopics
  //   } = data;
  //   console.log("Data: ", filteredData[index].title)
  //   const item = filteredData[index];
  //   const isItemSelected = isSelected(item._id);
  //   return (
  //       <div style={style}>
  //         <div>{ item.published }</div>
  //         <div>{ item.id }</div>
  //         <div>{ item.title }</div>
  //         {/* <div>{ item.category }</div>
  //         <div>{ item.source_id }</div>
  //         <div>{ item.source_name }</div>
  //         <div>{ item.section }</div>
  //         <div>{ item.brand }</div>
  //         <div>{ item.link }</div>
  //         <div>{ item.summary }</div> */}
  //       {/* <NewsTableRow
  //         key={ item._id }
  //         published={ item.published }
  //         docId={ item._id }
  //         title={ item.title }
  //         topics={ item.hasOwnProperty("topics") && item.topics != ""? item.topics.split(",") : [] }
  //         category={ item.category }
  //         allPossibleTopics= { allTopics }
  //         source_id={ item.source_id }
  //         source_name={ item.source_name }
  //         section={ item.section }
  //         brand={ item.brand }
  //         link={ item.link }
  //         summary={ item.summary }
  //         handleClick = { handleClick }
  //         handleUpdateTopics = { handleUpdateTopics }
  //         isUpdating = { false }
  //         selected = {isItemSelected}
  //       /> */}
  //       </div>
  //   );
  // }
  // console.log("Filtered data: ", filteredData);
  // console.log("Sorted List: ", sortedList)
  return (
    <div style={{ marginTop: "0.1em" }}>
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
        <div className={classes.tableWrapper}>
          <div style={{fontFamily: "Arial"}}>
            { filteredData.length } notícies.
          </div>
          { filteredData && filteredData.length > 0 &&
          <AutoSizer style={{height: "50em", fontFamily: "Arial"}}>
            {({ height, width }) => (
              <Table
                width={width}
                height={height}
                headerHeight={20}
                rowHeight={30}
                sort={sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                rowCount={filteredData.length}
                rowGetter={({ index }) => filteredData[index]}
              >
                <Column label="Data" dataKey="published" width={200} />
                <Column width={600} label="Notícia" dataKey="summary" />
              </Table>
            )}
          </AutoSizer>
        }
        </div>
      </Paper>
      )}
    </div>
  );
};
