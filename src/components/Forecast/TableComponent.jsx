import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import PropTypes from "prop-types";

function TableComponent({ forecastList }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date and Time</TableCell>
          <TableCell>Min Temperature</TableCell>
          <TableCell>Max Temperature</TableCell>
          <TableCell>Weather Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {forecastList
          .filter((_, index) => index % 8 === 0)
          .map((forecastInfo) => (
            <TableRow key={forecastInfo.dateString}>
              <TableCell>{forecastInfo.dateString}</TableCell>
              <TableCell>{forecastInfo.tempMin}</TableCell>
              <TableCell>{forecastInfo.tempMax}</TableCell>
              <TableCell>{forecastInfo.description}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

TableComponent.propTypes = {
  forecastList: PropTypes.array,
};

export default TableComponent;
