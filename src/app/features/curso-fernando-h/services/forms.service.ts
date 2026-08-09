import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { combineLatest, Observable, of } from 'rxjs';
import { CountryForm } from '../interfaces/form-country.interface';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private baseUrl = environment.apiCoutriesUrl;
  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<CountryForm[]> {
    if (!region) return of([]);

    console.log({ region });

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<CountryForm[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<CountryForm> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<CountryForm>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<CountryForm[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests: Observable<CountryForm>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}
