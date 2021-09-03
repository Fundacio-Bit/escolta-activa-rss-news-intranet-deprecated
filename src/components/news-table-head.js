import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import { CSVLink, CSVDownload } from "react-csv";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const styles = theme => ({
  dateTableCell: {
    width: 90,
  },
});


const csvHeaders = [
  { label: "Data", key: "published" },
  { label: "Títol", key: "title" },
  { label: "Link", key: "link" },
  { label: "Temas", key: "topics" }
];

class NewsTableHead extends React.Component {
  constructor(props) {
    super(props);  
  }


  render() {
    const { classes, onSelectAllClick, numSelected, rowCount} = this.props;
    var onRequestSort = this.props.onRequestSort;
    var data = this.props.data
    let formattedFilteredNews = data.map((item) => {
      item.title = item.title.replace('\n', '').replace('"', '')
      return item
    })

    return (
      <TableHead>
        < TableRow >
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all news' }}
            />
          </TableCell>
          <TableCell 
            className = {classes.dateTableCell}
            key = "published"
            align = "right"
            sortDirection = {this.props.sortDirection} >
            <Tooltip
              title = "Sort"
              placement = 'bottom-start'
              enterDelay = { 300 } >
              <TableSortLabel
                active = { true }
                direction = {this.props.sortDirection}
                onClick = { () => onRequestSort(this.props.sortBy, this.props.sortDirection) }
              >
                <h2>Data</h2>
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          <TableCell><h2>Notícia</h2></TableCell>
          <TableCell>
            <CSVLink data={formattedFilteredNews} headers = {csvHeaders} filename={"rss-news-" + this.props.selectedMonth + ".csv"}>
              <FontAwesomeIcon icon={faFileCsv} size="3x" />
            </CSVLink>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

NewsTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default  withStyles(styles)(NewsTableHead);