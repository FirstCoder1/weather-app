import PropTypes from "prop-types";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Notifications = ({ error, onClose }) => {
  return (
    <Snackbar open={!!error} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" elevation={6} variant="filled">
        {error}
      </Alert>
    </Snackbar>
  );
};

Notifications.propTypes = {
  error: PropTypes.string | null,
  onClose: PropTypes.func,
};

export default Notifications;
