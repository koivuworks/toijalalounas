// Ravintoloiden URL-osoitteet
const restaurants = [
  { name: "Lounaspirtti", url: "https://www.lounaspirtti.fi/ruokalista" },
  { name: "Ravintola Alibaba", url: "https://www.ravintolaalibaba.fi/lounas" },
  { name: "Ravintola Jounin Kauppa", url: "https://www.jouninkauppa.fi/lounas" },
  { name: "Pizzeria La Tavola", url: "https://www.pizzerialatavola.fi/lounas" }
];

// Funktio, joka hakee ja näyttää ravintoloiden lounaslistat
async function fetchLunchMenus() {
  const container = document.getElementById("lounas-container");

  // Tyhjennetään vanhat listat
  container.innerHTML = '';

  for (const restaurant of restaurants) {
    // Haetaan ravintolan sivu
    const response = await fetch(restaurant.url);
    const data = await response.text();

    // Tässä vaiheessa sinun täytyy käsitellä HTML-sisältö ja poimia lounaslistan tiedot
    const menuItems = extractMenu(data);

    // Luo HTML rakenteet lounaslistalle
    const restaurantDiv = document.createElement("div");
    restaurantDiv.classList.add("restaurant");

    const title = document.createElement("h2");
    title.textContent = `${restaurant.name} Lounas`;
    restaurantDiv.appendChild(title);

    const menuList = document.createElement("ul");
    menuList.classList.add("menu");

    menuItems.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      menuList.appendChild(listItem);
    });

    restaurantDiv.appendChild(menuList);
    container.appendChild(restaurantDiv);
  }
}

// Funktio, joka purkaa HTML:n ja palauttaa lounasruoat (tarvitsee räätälöidä oikealle rakenteelle)
function extractMenu(data) {
  // Tämä esimerkki käyttää vain yksinkertaista regexiä, mutta sinun täytyy käsitellä HTML-tietoja tarkemmin.
  // Tässä esimerkissä oletetaan, että lounasruoat ovat <h2> tai <li> tageissa.
  const regex = /<h2>(.*?)<\/h2>/g; // Esimerkiksi h2-elementit
  const menuItems = [];
  let match;

  // Poimi kaikki vastaavat elementit
  while ((match = regex.exec(data)) !== null) {
    menuItems.push(match[1]);
  }

  return menuItems;
}

// Lataa lounaslistat heti, kun sivu latautuu
fetchLunchMenus();
