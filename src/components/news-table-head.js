import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class NewsTableHead extends React.Component {

  render() {
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Updating Date</TableCell>
        <TableCell>Title</TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  }
}

export default  NewsTableHead;