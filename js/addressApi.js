const baseUrlCinemas =
  "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation%2C%20geom'POINT";
const baseUrlAdress = "https://api-adresse.data.gouv.fr/search/";
const adressSelected = document.getElementById("adress-selected");
export const fetchCinemasList = (coords) => {
  return fetch(
    `${baseUrlCinemas}(${coords.longitude}%20${coords.latitude})'%2C%2020km)&limit=20`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch cinemas");
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching cinemas:", error);
    });
};

export const findByAdress = (adress, distance) => {
  return fetch(
    `${baseUrlAdress}?q=${encodeURIComponent(adress)}&limit=${distance}`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch address data");
      return response.json();
    })
    .then((response) => {
      if (response.features.length === 0) {
        throw new Error("No address found");
      }
      adressSelected.innerText = "";
      adressSelected.append(response.features[0].properties.label);
      const [longitude, latitude] = response.features[0].geometry.coordinates;
      return fetchCinemasList({ longitude, latitude });
    })
    .catch((error) => {
      console.error("Error finding cinemas by address:", error);
    });
};
