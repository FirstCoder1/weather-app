import { useState } from "react";
import { Input, Tooltip } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Search.module.css";

function SearchInput({ handleSearch, className }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (targetValue) => {
    setInputValue(targetValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  return (
    <Tooltip title="Please input city name for search">
      <Input
        className={classNames(styles.search, className)}
        type="text"
        startAdornment={<SearchIcon />}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="London,uk"
        autoFocus
      />
    </Tooltip>
  );
}

SearchInput.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchInput.defaultProps = {
  className: "",
};

export default SearchInput;
