import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { WeatherIcon } from "./WeatherIcon";

import styles from "./Forecast.module.css";

const StyledTableCell = withStyles({
  root: {
    color: "#eee",
    fontSize: 20,
  },
})(TableCell);

function TableComponent({ forecastList }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Date and Time</StyledTableCell>
          <StyledTableCell>Min Temperature</StyledTableCell>
          <StyledTableCell>Max Temperature</StyledTableCell>
          <StyledTableCell>Weather Description</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {forecastList
          .filter((_, index) => index % 8 === 0)
          .map((forecastInfo) => (
            <TableRow key={forecastInfo.dateString}>
              <StyledTableCell>{forecastInfo.dateString}</StyledTableCell>
              <StyledTableCell>{forecastInfo.tempMin}</StyledTableCell>
              <StyledTableCell>{forecastInfo.tempMax}</StyledTableCell>
              <StyledTableCell>
                <div className={styles.descriptionContainer}>
                  <WeatherIcon description={forecastInfo.description} />
                  {forecastInfo.description}
                </div>
              </StyledTableCell>
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
