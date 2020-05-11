import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import SourceRow from "./source-row";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing(y) * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  tableCell: {
    padding: "4px 56px 4px 24px",
  },
  frequencyTableCell: {
    alignContent: "center",
    textAlign: "center",
  },
  input: {
    display: "none",
  },
  title: {
    // margin: theme.spacing(y),
    flex: "0 0 auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    padding: "4px 56px 4px 24px",
    color: "dimgrey",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(16),
    color: "lightslategrey",
    padding: "4px 56px 4px 24px",
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  summary: {
    backgroundColor: "#0e983214",
    padding: "4px 56px 4px 24px",
    // minHeight: '40px',
    // height: '40px'
  },
  details: {
    alignItems: "center",
    display: "block",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    // padding: `${theme.spacing(y)}px ${theme.spacing(y) * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

class SourcesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rssSources: [],
      page: 0,
      rowsPerPage: 5,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.filterResourcesList = this.filterResourcesList.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.groupBySource = this.groupBySource.bind(this);
  }

  //  Callback that ensures that the API calls done by this component are executed once it is mounted.
  componentDidMount() {
    this.retrievedDocumentsList();
  }

  //  Call the REST API to get all documents
  retrievedDocumentsList() {
    var self = this;
    axios.get("/rss-sources/sources").then((results) => {
      self.setState({ rssSources: results.data.results });
    });
  }

  handleChangePage(event, page) {
    this.setState({ page });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }

  filterResourcesList(resource) {
    if (
      resource.source_id.indexOf(this.props.countrySelectorValue) !== -1 &&
      (this.props.activeSelectorValue === "" ||
        resource.is_active === (this.props.activeSelectorValue !== "false"))
    ) {
      return true;
    } else return false;
  }

  // TODO: group efficiently using map, filter and reduce functions (remove foreach loops)
  // TODO: Filter by Source_id instead of source_name
  // TODO: check if using a Mongo aggregation in the router we increase the loading speed
  groupBySource(rssSourcesArray, startPos, endPos) {
    const sourcesArray = rssSourcesArray.map((u) => {
      return u.source_name;
    });
    const uniqueSourcesArray = [...new Set(sourcesArray)];
    const sourcesNumber = uniqueSourcesArray.length;
    const feedsBySourceArray = new Array();
    // TODO add a unique key to all array elements. It can be the source_id
    uniqueSourcesArray.slice(startPos, endPos).forEach((uniqueSource, i) => {
      const feedsBySource = {
        key: uniqueSource + i,
        source_name: uniqueSource,
        feeds: rssSourcesArray.filter(
          (rssSource) => rssSource.source_name === uniqueSource
        ),
      };
      feedsBySourceArray.push(feedsBySource);
    });

    return {
      feedsBySource: feedsBySourceArray,
      uniqueSourcesNumber: sourcesNumber,
    };
  }

  handleToggleClick(id, isActiveFlag) {
    axios
      .put("/rss-sources/identifier/" + id + "/active/" + isActiveFlag)
      .then((res) => {
        // we can update the state after response...
        const retrievedSources = this.state.rssSources;
        const index = retrievedSources.findIndex((x) => x._id == id);
        retrievedSources[index].is_active = isActiveFlag;
        // we can update the state after response...
        this.setState({ rssSources: retrievedSources });
      });
  }

  render() {
    const { classes } = this.props;
    const { rssSources, rowsPerPage, page } = this.state;
    const paginationOptions = [5, 10];
    // const filteredSources = this.filterResourcesList(rssSources)
    const filteredSources = rssSources.filter(this.filterResourcesList);
    const groupedSources = this.groupBySource(
      filteredSources,
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    // Code got from https://www.consolelog.io/group-by-in-javascript/
    // A detailed explanation can be found at the URL above.
    // Array.prototype.groupBy = (prop) =>{
    //   return filteredSources.reduce((groups,item)=>{
    //     const val = item[prop]
    //     groups[val]= groups[val] || []
    //     groups[val].push(item)
    //     return groups
    //   },{})}

    // const groupedBySourceName = filteredSources.groupBy('source_name')
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rssSources.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <TablePagination
            component="div"
            count={groupedSources.uniqueSourcesNumber}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={paginationOptions}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />

          {groupedSources.feedsBySource.map((source) => {
            if (source.feeds) {
              return (
                <ExpansionPanel key={source.key}>
                  <ExpansionPanelSummary
                    className={classes.summary}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div className={classes.column}>
                      <Typography className={classes.heading}>
                        {source.source_name}
                      </Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.secondaryHeading}>
                        {source.feeds.length} categories
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.tableWrapper}>
                      <div className={classes.title}>
                        <Table
                          className={classes.table}
                          aria-labelledby="tableTitle"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableCell}>
                                Extracció
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                Categoria
                              </TableCell>
                              <TableCell className={classes.frequencyTableCell}>
                                <Tooltip title="Minuts entre notícies">
                                  <ScheduleIcon />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {source.feeds.map((feed) => {
                              return (
                                <SourceRow
                                  //TODO:check what are keys for.
                                  // They should be unique and cannot be rendered in the DOM using prop.key
                                  key={feed._id}
                                  // published={u.published}
                                  // newsCounter={u.news_counter}
                                  handleToggleClick={this.handleToggleClick}
                                  docId={feed._id}
                                  isActive={feed.is_active}
                                  sourceId={feed.source_id}
                                  sourceName={feed.source_name}
                                  section={feed.section}
                                  isOperative={feed.is_operative}
                                  frequency={feed.average_mins_between_news}
                                  feedUrl={feed.feed_url}
                                />
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            } else {
              return <div></div>;
            }
          })}
        </div>
      </Paper>
    );
  }
}

SourcesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SourcesList);
