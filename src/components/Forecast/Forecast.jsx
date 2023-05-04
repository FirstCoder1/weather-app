import { memo } from "react";
import PropTypes from "prop-types";
import { TableContainer } from "@material-ui/core";
import { scaleLinear, scaleBand } from "d3-scale";
import { line, curveMonotoneX } from "d3-shape";
import { extent } from "d3-array";
import { transition } from "d3-transition";

import XYAxis from "./XYAxis";
import Line from "./line";
import TableComponent from "./TableComponent";

import { PARENT_WIDTH, MARGINS } from "../../constants/graph";

import styles from "./Forecast.module.css";

function Forecast({ forecastList, location }) {
  const data = forecastList
    .filter((_, index) => index % 8 === 0)
    .map(({ dateString, temp }) => ({
      dateString: dateString.split(" ")[0],
      temp,
    }));

  const width = PARENT_WIDTH - MARGINS.left - MARGINS.right;
  const height = 300 - MARGINS.top - MARGINS.bottom;

  const ticks = Math.floor(height / 50);
  const t = transition().duration(1000);

  const xScale = scaleBand()
    .domain(data.map((d) => d.dateString))
    .rangeRound([0, width])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.temp))
    .range([height, 0])
    .nice();

  const lineGenerator = line()
    .x((d) => xScale(d.dateString))
    .y((d) => yScale(d.temp))
    .curve(curveMonotoneX);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{`Forecast for 5 days in ${location}`}</div>
      <div className={styles.content}>
        <TableContainer>
          <TableComponent forecastList={forecastList} />
        </TableContainer>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width + MARGINS.left + MARGINS.right}
            height={height + MARGINS.top + MARGINS.bottom}
          >
            <g transform={`translate(${MARGINS.left}, ${MARGINS.top})`}>
              <XYAxis {...{ xScale, yScale, height, ticks, t, MARGINS }} />
              <g transform={`translate(${width / 10}, 0)`}>
                <Line
                  data={data}
                  xScale={xScale}
                  yScale={yScale}
                  lineGenerator={lineGenerator}
                  width={width}
                  height={height}
                  margins={MARGINS}
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

Forecast.propTypes = {
  forecastList: PropTypes.arrayOf(
    PropTypes.shape({
      dateString: PropTypes.string,
      tempMin: PropTypes.number,
      tempMax: PropTypes.number,
      description: PropTypes.string,
    })
  ),
  location: PropTypes.string,
};

Forecast.defaultProps = {
  forecastList: [],
  location: "",
};

export default memo(Forecast);
