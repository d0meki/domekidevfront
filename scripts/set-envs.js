const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPathProd = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapboxKey = process.env['MAPBOX_KEY'];
const giphyApiKey = process.env['GIPHY_API_KEY'];
const apiCountriesUrl = process.env['COUNTRY_API_URL'];
const giphyUrl = process.env['GIPHY_API_URL'];
const tesloApiUrl = process.env['TESLO_API_URL'];
const apiUsersKey = process.env['API_USERS_KEY'];

if (
  !mapboxKey ||
  !giphyApiKey ||
  !apiCountriesUrl ||
  !giphyUrl ||
  !tesloApiUrl ||
  !apiUsersKey
) {
  throw new Error(
    'MAPBOX_KEY or GIPHY_API_KEY or COUNTRY_API_URL or GIPHY_API_URL or TESLO_API_URL or API_USERS_KEY is not defined',
  );
}

const envFileContent = `export const environment = {
    // ApiKeys
    mapboxApiKey: "${mapboxKey}",
    giphyApiKey: "${giphyApiKey}",
    // Apis Urls
    apiCoutriesUrl: "${apiCountriesUrl}",
    giphyUrl: "${giphyUrl}",
    tesloApiUrl: "${tesloApiUrl}",
    apikeyUsers: "${apiUsersKey}",
};`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPathDev, envFileContent);

writeFileSync(targetPathProd, envFileContent);
