async function searchCountry() {
  const keyword = document.getElementById('keyword').value.trim();
  const warningContainer = document.getElementById('warning_container');
  const countryDetails = document.getElementById('country_details');
  const regionCountries = document.getElementById('countries_in_same_region');

  countryDetails.innerHTML = '';
  regionCountries.innerHTML = '';
  warningContainer.innerHTML = '';
  countryDetails.classList.remove('show-border');
  regionCountries.classList.remove('show-border');

  if (!keyword) {
    warningContainer.innerHTML = '<p>Please enter a country name.</p>';
    return;
  }

  try {
    const response1 = await fetch(`
      https://restcountries.com/v3.1/name/${keyword}
    `);

    const data1 = await response1.json();

    if (!data1 || data1.status === 404) {
      throw new Error("Country not found.");
    }

    const country = data1[0];
    const region = country.region;
    const timezones = country.timezones.map((tz) => `${tz}`).join(', ');

    countryDetails.innerHTML = `
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion}</p>
      <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
      <p><strong>Timezones:</strong> ${timezones}</p>
    `;

    countryDetails.classList.add('show-border');

    const response2 = await fetch(`
      https://restcountries.com/v3.1/region/${region}
    `);

    const data2 = await response2.json();

    const otherCountries = data2
      .filter((c) => c.name.common !== country.name.common)
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .map((c) => `<li>${c.name.common}</li>`)
      .join('');

    regionCountries.innerHTML = `
      <h2>Other countries in ${region}:</h2>
      <ul>${otherCountries}</ul>
    `;

    regionCountries.classList.add('show-border');
  } catch (error) {
    warningContainer.innerHTML = `<p>${error.message}</p>`;
    return;
  }
}