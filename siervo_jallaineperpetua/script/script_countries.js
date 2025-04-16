document.addEventListener("DOMContentLoaded", function () {
  const countryInput = document.getElementById("country_input");
  const searchButton = document.getElementById("search_button");
  const countryDetails = document.getElementById("country_details");
  const regionCountries = document.getElementById("region_countries");
  const errorMessage = document.getElementById("error_message");
  const loadingIndicator = document.getElementById("loading");
  const countriesGrid = document.getElementById("countries_grid");

  const elements = {
    flag: document.getElementById("country_flag"),
    name: document.getElementById("country_name"),
    nativeName: document.getElementById("country_native_name"),
    capital: document.getElementById("country_capital"),
    region: document.getElementById("country_region"),
    population: document.getElementById("country_population"),
    area: document.getElementById("country_area"),
    currency: document.getElementById("country_currency"),
    languages: document.getElementById("country_languages"),
  };

  function searchCountry() {
    const query = countryInput.value.trim();

    if (!query) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Please enter a country name";
      return;
    }

    countryDetails.style.display = "none";
    regionCountries.style.display = "none";
    errorMessage.style.display = "none";
    loadingIndicator.style.display = "block";

    fetch(`https://restcountries.com/v3.1/name/${query}`)
      .then((response) => {
        if (!response.ok) throw new Error("Country not found");
        return response.json();
      })
      .then((data) => {
        const country = data[0];
        displayCountryDetails(country);

        return fetch(`https://restcountries.com/v3.1/region/${country.region}`);
      })
      .then((response) => response.json())
      .then((regionData) => {
        displayRegionCountries(regionData);
        loadingIndicator.style.display = "none";
      })
      .catch(() => {
        loadingIndicator.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.textContent =
          "Country not found. Please try a different search term.";
      });
  }

  function displayCountryDetails(country) {
    elements.flag.src = country.flags.png;
    elements.flag.alt = `Flag of ${country.name.common}`;
    elements.name.textContent = country.name.common;

    if (country.name.nativeName) {
      const key = Object.keys(country.name.nativeName)[0];
      elements.nativeName.textContent =
        `Native name: ${country.name.nativeName[key].common}`;
    } else {
      elements.nativeName.textContent = "";
    }

    elements.capital.textContent = country.capital
      ? country.capital.join(", ")
      : "N/A";
    elements.region.textContent = country.subregion
      ? `${country.region} (${country.subregion})`
      : country.region;
    elements.population.textContent = country.population.toLocaleString();
    elements.area.textContent = country.area
      ? `${country.area.toLocaleString()} km²`
      : "N/A";

    if (country.currencies) {
      const currencyKeys = Object.keys(country.currencies);
      elements.currency.textContent = currencyKeys
        .map((key) => {
          const curr = country.currencies[key];
          return `${curr.name} (${curr.symbol || key})`;
        })
        .join(", ");
    } else {
      elements.currency.textContent = "N/A";
    }

    elements.languages.textContent = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    countryDetails.style.display = "block";
  }

  function displayRegionCountries(countries) {
    countriesGrid.innerHTML = "";

    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    const currentCountryName = elements.name.textContent;
    const filteredCountries = countries
      .filter((country) => country.name.common !== currentCountryName)
      .slice(0, 15);

    filteredCountries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.className = "country-card";

      countryCard.innerHTML =
        `<img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <div class="country-card-info">
          <h3>${country.name.common}</h3>
          <p>${country.capital ? country.capital[0] : "N/A"}</p>
        </div>`;

      countriesGrid.appendChild(countryCard);
    });

    regionCountries.style.display = "block";
  }

  searchButton.addEventListener("click", searchCountry);
  countryInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") searchCountry();
  });
});