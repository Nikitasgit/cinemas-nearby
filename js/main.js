import { fetchCinemasList, findByAdress } from "./addressApi.js";
import { displayCinemas } from "./cinemaApi.js";
import { getUserCoords } from "./geolocation.js";
const locationBtn = document.getElementById("user-submit-location");
const adressInput = document.getElementById("adress-input");
const searchBtn = document.getElementById("search-btn");
const distance = document.getElementById("distance");
const distanceValue = document.getElementById("distance-value");

distance.addEventListener("input", () => {
  distanceValue.textContent = distance.value;
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  findByAdress(adressInput.value, distance.value).then((response) => {
    displayCinemas(response);
  });
});

locationBtn.addEventListener("click", () => {
  getUserCoords()
    .then((response) => fetchCinemasList(response))
    .then((response) => displayCinemas(response));
});
