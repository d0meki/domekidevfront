import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryList } from '@app/features/curso-fernando-h/components/country-list/country-list';
import { SearchInput } from '@app/features/curso-fernando-h/components/search-input/search-input';
import { CountryService } from '@app/features/curso-fernando-h/services/country.service';
import { Region } from '@app/features/curso-fernando-h/interfaces/region.type';
import { Option, SelectComponent } from '@app/shared/components/form/select/select.component';

type SearchMode = 'capital' | 'country' | 'region';

@Component({
  selector: 'app-country-index',
  imports: [CountryList, SearchInput, SelectComponent],
  template: `
    <section class="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end">
      <div class="w-full sm:max-w-xs">
        <label class="mb-1 block text-sm text-gray-600 dark:text-gray-300" for="search-mode">
          Buscar por
        </label>
        <app-select
          id="search-mode"
          [options]="searchModes"
          [value]="searchMode()"
          (valueChange)="changeSearchMode($event)"
        />
      </div>

      @if (searchMode() === 'region') {
        <div class="w-full sm:max-w-xs">
          <label class="mb-1 block text-sm text-gray-600 dark:text-gray-300" for="region">
            Región
          </label>
          <app-select
            id="region"
            placeholder="Seleccione una región"
            [options]="regionOptions"
            [value]="selectedRegion()"
            (valueChange)="changeRegion($event)"
          />
        </div>
      } @else {
        <div class="w-full sm:flex-1">
          <country-search-input
            [placeholder]="searchMode() === 'capital' ? 'Buscar por capital' : 'Buscar por país'"
            /* (value)="query.set($event)" */
            (value)="onSearch($event)"
            [initialValue]="query()"
          />
        </div>
      }
    </section>

    <country-list
      [countries]="countryResource.hasValue() ? countryResource.value()! : []"
      [errorMessage]="errorMessage()"
      [isEmpty]="isEmpty()"
      [isLoading]="countryResource.isLoading()"
    />
  `,
  styleUrl: './country-index.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountryIndex {
  private readonly countryService = inject(CountryService);

  readonly searchModes: Option[] = [
    { value: 'capital', label: 'Capital' },
    { value: 'country', label: 'País' },
    { value: 'region', label: 'Región' },
  ];

  readonly regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  readonly regionOptions: Option[] = this.regions.map((region) => ({
    value: region,
    label: region,
  }));

  readonly searchMode = signal<SearchMode>('capital');
  readonly query = signal('');
  readonly selectedRegion = signal<Region>('Americas');

  readonly countryResource = rxResource({
    params: () => ({
      mode: this.searchMode(),
      query: this.query().trim(),
      region: this.selectedRegion(),
    }),
    stream: ({ params }) => {
      console.log(`valor del modo ${params.mode}`);

      if (params.mode === 'region') {
        return this.countryService.searchByRegion(params.region);
      }
      console.log(`valor de la query ${params.query}`);

      if (!params.query) return of([]);

      return params.mode === 'capital'
        ? this.countryService.searchByCapital(params.query)
        : this.countryService.searchByCountry(params.query);
    },
  });

  readonly errorMessage = computed((): Error | undefined => {
    const error = this.countryResource.error();
    return error ? (error instanceof Error ? error : new Error('Unknown error')) : undefined;
  });

  readonly isEmpty = computed(() => {
    return this.countryResource.hasValue() && this.countryResource.value()!.length === 0;
  });

  changeSearchMode(value: string): void {
    if (value === 'capital' || value === 'country' || value === 'region') {
      this.searchMode.set(value);
    }
  }

  changeRegion(value: string): void {
    if (this.regions.includes(value as Region)) {
      this.selectedRegion.set(value as Region);
    }
  }

  onSearch($event: string): void {
    console.log($event);
    this.query.set($event);
  }
}
