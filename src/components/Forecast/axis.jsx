import React from "react";
import PropTypes from "prop-types";
import { select, selectAll } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { transition } from "d3-transition";

function Axis(props) {
  const ref = React.useRef();

  React.useEffect(() => {
    renderAxis();
  }, []);

  React.useEffect(() => {
    updateAxis();
  });

  function renderAxis() {
    const { scale, orient, ticks } = props;
    const node = ref.current;
    let axis;

    switch (orient) {
      case "bottom":
        axis = axisBottom(scale);
        break;
      case "left":
        axis = axisLeft(scale).ticks(ticks);
        break;
      default:
        axis = null;
    }

    if (axis) {
      select(node).call(axis);
    }
  }

  function updateAxis() {
    const { scale, orient, ticks } = props;
    const t = transition().duration(1000);

    switch (orient) {
      case "bottom":
        break; // No update required for bottom axis
      case "left":
        const axis = axisLeft(scale).ticks(ticks);
        selectAll(`.${orient}`).transition(t).call(axis);
        break;
      default:
        break;
    }
  }

  const { orient, transform } = props;
  return <g ref={ref} transform={transform} className={`${orient} axis`} />;
}

Axis.propTypes = {
  scale: PropTypes.func.isRequired,
  orient: PropTypes.oneOf(["left", "bottom"]).isRequired,
  ticks: PropTypes.number,
  transform: PropTypes.string,
};

Axis.defaultProps = {
  ticks: 5,
  transform: "",
};

export default React.memo(Axis);
