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