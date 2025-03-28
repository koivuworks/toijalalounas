// Funktio, joka hakee lounaslistat
async function fetchLunchMenu() {
  const response = await fetch('https://www.lounaspirtti.fi/ruokalista'); // Muuta tähän oikea URL
  const data = await response.text();
  const menuList = document.getElementById("lunch-menu");

  // Oletetaan, että saat HTML:n ja käytät regex tai muuta tekniikkaa saadaksesi menu
  // Tässä esimerkissä oletetaan, että ruokalista on tietynlaista HTML-rakennetta

  const menuItems = extractMenu(data); // Täytyy implementoida tämä funktio
  menuList.innerHTML = ''; // Tyhjennä vanhat tiedot

  menuItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    menuList.appendChild(listItem);
  });
}

// Funktio, joka "purkaa" lounaslistan HTML:n ja palauttaa ruoat
function extractMenu(data) {
  // Tämä on esimerkki, joka tarvitsee räätälöidä oikealle HTML-rakenteelle
  const regex = /<h2>(.*?)<\/h2>/g; // Esimerkiksi h2-elementit
  const menuItems = [];
  let match;
  
  while ((match = regex.exec(data)) !== null) {
    menuItems.push(match[1]);
  }
  
  return menuItems;
}

// Hae lounaslistat heti, kun sivu latautuu
fetchLunchMenu();

// Päivitä lounaslistat kerran tunnissa
setInterval(fetchLunchMenu, 60 * 60 * 1000); // 1 tunti
