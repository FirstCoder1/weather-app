import React, { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";

function Line({ data, lineGenerator }) {
  const ref = useRef();

  const initialData = data.map((d) => ({
    dateString: d.dateString,
    temp: 0,
  }));

  useEffect(() => {
    const node = select(ref.current);

    const line = node
      .append("path")
      .datum(initialData)
      .attr("id", "line")
      .attr("stroke", "#33f")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineGenerator);

    return () => {
      line.remove(); // Remove the line when unmounting
    };
  }, []);

  useEffect(() => {
    const updatedLine = select("#line");
    const t = transition().duration(1000);
    updatedLine.datum(data).transition(t).attr("d", lineGenerator);
  }, [data, lineGenerator]);

  return <g className="line-group" ref={ref} />;
}

export default Line;
