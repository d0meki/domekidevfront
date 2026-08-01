import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

type RESTCountryObject = RESTCountry['data']['objects'][number];

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountryObject): Country {
    return {
      capital: restCountry.capitals?.[0]?.name ?? 'Sin capital',
      cca2: restCountry.codes.alpha_2,
      flag: restCountry.flag.emoji,
      flagSvg: restCountry.flag.url_svg,
      name:
        restCountry.names.native?.spa?.common ??
        restCountry.names.translations['spa']?.common ??
        restCountry.names.common,
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
      cca3: restCountry.codes.alpha_3,
      borders: restCountry.borders ?? [],
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountryObject[]): Country[] {
    return restCountries.map((restCountry) => this.mapRestCountryToCountry(restCountry));
  }
}
