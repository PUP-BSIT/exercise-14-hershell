function searchCountry() {
    const countryName = document.getElementById("country_input").value;
    const countryUrl = `https://restcountries.com/v3.1/name/${countryName}`;
  
    fetch(countryUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then((data) => {
        const country = data[0];
        displayCountryDetails(country);
  
        const region = country.region;
        fetchRegionCountries(region);
      })
      .catch((error) => {
        document.getElementById(
          "country_details"
        ).innerHTML = `<p>${error.message}</p>`;
        document.getElementById("region_countries").innerHTML = "";
      });
}

function displayCountryDetails(country) {
    const countryDetailsDiv = document.getElementById("country_details");
    const formattedPopulation = new Intl.NumberFormat()
        .format(country.population);

    countryDetailsDiv.innerHTML = `
            <p><img src="${country.flags.png}" alt="Flag of 
                ${country.name.common}" width="100"></p>
            <p><strong>Name:</strong> ${country.name.common}</p>
            <p><strong>Capital:</strong> ${
                country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Population:</strong> ${formattedPopulation}</p>
            <p><strong>Languages:</strong>
                ${Object.values(country.languages).join(", ")}</p>`;
}

function fetchRegionCountries(region) {
    const regionUrl = `https://restcountries.com/v3.1/region/${region}`;
  
    fetch(regionUrl)
      .then((response) => response.json())
      .then((data) => {
        displayRegionCountries(data);
      });
}

function displayRegionCountries(countries) {
    const regionCountriesDiv = document.getElementById("region_countries");
    const countryNames = countries.map((country) => country.name.common);

    regionCountriesDiv.innerHTML = '';

    const outputContainer = document.createElement("div");
    outputContainer.className = "country-output";

    const maxLines = 5;
    const countriesPerLine = Math.ceil(countryNames.length / maxLines);

    for (let index = 0; index < maxLines; index++) {
      const rowCountries = countryNames
            .slice(index * countriesPerLine, (index + 1) * countriesPerLine);

      const lineDiv = document.createElement("div");
      lineDiv.className = "country-line";

      rowCountries.forEach(country => {
        const countryItem = document.createElement("span");
        countryItem.className = "country-item";
        countryItem.textContent = `• ${country}`;
        lineDiv.appendChild(countryItem);
      });

      outputContainer.appendChild(lineDiv);
    }

    regionCountriesDiv.appendChild(outputContainer);
}