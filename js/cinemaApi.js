const list = document.getElementById("cinemas-list");
export const displayCinemas = (response) => {
  const cinemas = response.results;
  list.innerText = "";
  cinemas.map((cinema) => {
    const cinemaItem = document.createElement("li");
    const itemName = document.createElement("p");
    const itemAdress = document.createElement("p");
    itemName.append(`Cinéma: ${cinema.nom}`);
    list.appendChild(itemName);
    itemAdress.append(`Adresse: ${cinema.adresse}`);
    list.appendChild(itemAdress);
    list.appendChild(cinemaItem);
  });
};
