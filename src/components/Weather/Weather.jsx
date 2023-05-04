import { memo } from "react";
import PropTypes from "prop-types";

import { LABEL_MAP } from "../../constants/weather";

import styles from "./Weather.module.css";

const ContentBlock = ({ label, content, unit }) => (
  <div className={styles.contentBlock}>
    <div className={styles.label}>{`${label}: `}</div>
    <div className={styles.content}>{`${content} ${unit ?? ""}`}</div>
  </div>
);

function Weather({ weather, location }) {
  if (!weather)
    return (
      <div className={styles.container}>
        There is no result with the inputted city. Please input the correct city
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.title}>{`Today Weather in ${location}`}</div>
      <div className={styles.content}>
        {LABEL_MAP.map(({ key, label, unit }) => (
          <ContentBlock
            key={key}
            label={label}
            content={weather[key]}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}

Weather.propTypes = {
  weather: PropTypes.object,
  location: PropTypes.string,
};

export default memo(Weather);
