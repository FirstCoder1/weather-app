const apiKey = process.env.REACT_APP_API_KEY;

function parseForecast(data) {
  if (data?.list?.length > 0) {
    return data.list.map((record) => ({
      dateString: record.dt_txt,
      temp: record.main?.temp,
      tempMin: record.main?.temp_min,
      tempMax: record.main?.temp_max,
      description: record.weather?.[0]?.description,
      weather: record.weather?.[0]?.main,
    }));
  } else {
    return [];
  }
}

export async function getForecast(location) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return { data: parseForecast(data), status: "ok" };
  } catch {
    return { status: "error" };
  }
}

function parseWeather(data) {
  return {
    temp: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
  };
}

export async function getWeather(location) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return { data: parseWeather(data), status: "ok" };
  } catch (e) {
    return { status: "error" };
  }
}
