import { getForecast, getWeather } from "./weather";

describe("getForecast", () => {
  it("returns weather data for the specified location", async () => {
    const data = await getForecast("London,uk");
    expect(data).toBeDefined();
    expect(data.data.length).toBeGreaterThan(0);
  });

  it("returns empty object when location is not provided", async () => {
    const data = await getForecast();
    expect(data).toEqual({ data: [], status: "ok" });
  });

  it("returns empty object when location is empty string", async () => {
    const data = await getForecast("");
    expect(data).toEqual({ data: [], status: "ok" });
  });
});

describe("getWeather", () => {
  it("returns weather data for the specified location", async () => {
    const data = await getWeather("London,uk");
    expect(data).toBeDefined();
    expect(Object.keys(data.data).length).toBeGreaterThan(0);
  });

  it("returns empty object when location is not provided", async () => {
    const data = await getWeather();
    expect(data).toEqual({ status: "error" });
  });

  it("returns empty object when location is empty string", async () => {
    const data = await getWeather("");
    expect(data).toEqual({ status: "error" });
  });
});
