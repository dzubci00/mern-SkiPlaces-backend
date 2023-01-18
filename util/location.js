const axios = require("axios");
const HttpError = require("../models/http-error");

async function getCoordsForAdress(adress) {
  //return { lat: 40.414142, lng: -73.124124 };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      adress
    )}&key=AIzaSyD6c7jFc39-ouqHFO0TFym214cvpS4-Rkk`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for specified adress.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordsForAdress;
