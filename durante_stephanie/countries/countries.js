function searchCountry() {
  const txtBox = document.getElementById("country_input").value;

  const countryData = {
    countryRegion: "",
    countryInfo: {
      name: "",
      area: "",
      population: "",
      currencies: {},
      capital: "",
      region: "",
      flag: "",
    },
    regionData: [],
  };

  fetch(`https://restcountries.com/v3.1/name/${txtBox}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.length) throw new Error("Country not found");

      const [country] = data;
      countryData.countryRegion = country?.region;
      countryData.countryInfo = {
        name: country.name.common,
        area: country.area.toLocaleString(),
        population: country.population.toLocaleString(),
        currencies: country.currencies,
        capital: country.capital[0],
        region: country.region,
        flag: country.flags.png,
      };
      let region = country.region;
      const call = `https://restcountries.com/v3.1/region/${region}`;
      return fetch(call)
        .then(function (response) {
          return response.json();
        })
        .then(function (regionData) {
          countryData.regionData = regionData;
        });
    })
    .then(function () {
      const { countryInfo, regionData } = countryData;
      document.getElementById("country_details").innerHTML = `
            <h3>Country Information</h3>
            <img src="${countryInfo.flag}" alt="Flag of ${countryInfo.name}"/>
            <p>Country Name: ${countryInfo.name}</p>
            <p>Population: ${countryInfo.population}</p>
            <p>Area: ${countryInfo.area}</p>
            <p>Currencies: ${Object.values(countryInfo.currencies)
                  .map((currency) => `${currency.name} (${currency.symbol})`)
                  .join(", ")}</p>
            <p>Capital City: ${countryInfo.capital}</p>
            <p>Region: ${countryInfo.region}</p>`;

      const countriesInRegion = regionData
        .map(function (country) {
          return `
                <div>
                    <img
                        src="${country.flags.png}"
                        alt="Flag of ${country.name.common}"/>
                    <p>${country.name.common}</p>
                </div>`;
        })
        .join("");
      document.getElementById("countries_in_region").innerHTML = `
            <h3 class="region-title">Countries in the Same Region</h3>
            <div class="countries-container">
                  ${countriesInRegion}
            </div>`;
    })
    .catch(function () {
      document.getElementById("country_details")
          .innerHTML = `<p>Country not found</p>`;
      document.getElementById("countries_in_region").innerHTML = "";
    });
}