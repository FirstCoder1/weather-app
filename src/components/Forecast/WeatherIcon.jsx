import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Brightness5OutlinedIcon from "@material-ui/icons/Brightness5Outlined";

const WEATHER_ICON_MAP = new Map([
  ["clouds", <CloudOutlinedIcon />],
  ["rain", <BeachAccessIcon />],
  ["sky", <Brightness5OutlinedIcon />],
]);

export const WeatherIcon = ({ description }) => {
  for (const [key, value] of WEATHER_ICON_MAP) {
    if (description.includes(key)) return value;
  }
};
