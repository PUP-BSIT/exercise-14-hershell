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