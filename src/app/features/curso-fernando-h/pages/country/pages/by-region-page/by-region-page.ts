import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
// import { CountryList } from '@app/country/components/country-list/country-list';
// import { CountryService } from '@app/country/services/country.service';
import { map, of } from 'rxjs';
// import { SearchInput } from '@app/country/components/search-input/search-input';
// import { Region } from '@app/country/interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';
import { Region } from '@app/features/curso-fernando-h/interfaces/region.type';
import { CountryService } from '@app/features/curso-fernando-h/services/country.service';
// import { Button } from 'primeng/button';
function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  console.log(queryParam);

  return validRegions[queryParam] ?? 'Americas';
}
@Component({
  selector: 'app-by-region-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <!-- <country-search-input placeholder="Buscar Por Region" (value)="query.set($event)" /> -->
    <h1 class="text-2xl">Por región</h1>
    <h3 class="text-lg">Seleccione una región</h3>

    <!-- <section class="row mt-2">
      <div class="flex-col">
        @for (region of regions; track region) {
          <p-button
            class="m-2"
            label="{{ region }}"
            variant="text"
            [raised]="true"
            (click)="selectedRegion.set(region)"
            [severity]="selectedRegion() === region ? 'primary' : 'secondary'"
          />
        }
      </div>
    </section>
    <country-list
      [countries]="countryResource.hasValue() ? countryResource.value() : []"
      [errorMessage]="errorMessage()"
      [isEmpty]="isEmpty()"
      [isLoading]="countryResource.isLoading()"
    /> -->
  `,
})
export default class ByRegionPage {
  countryService = inject(CountryService);
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  // selectedRegion = signal<Region | null>(null);

  // query = signal('');
  // countryResource = rxResource({
  //   params: () => ({ query: this.query() }),
  //   stream: ({ params }) => {
  //     if (!params.query) return of([]);

  //     return this.countryService.serchByRegion(params.query);
  //   },
  // });

  errorMessage = computed((): Error | undefined => {
    const err = this.countryResource.error();
    if (!err) return undefined;
    return err instanceof Error ? err : new Error('Error desconocido');
  });

  isEmpty = computed(() => {
    if (!this.countryResource.hasValue()) return false;
    return this.countryResource.value()!.length === 0;
  });
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // Reactivo: se actualiza cada vez que cambia el query param en la URL
  queryParam = toSignal(
    this.activatedRoute.queryParamMap.pipe(map((params) => params.get('region') ?? '')),
    { initialValue: this.activatedRoute.snapshot.queryParamMap.get('region') ?? '' },
  );

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam()));

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      console.log({ params: params.region });

      if (!params.region) return of([]);

      this.router.navigate(['/dashboard/countries/region'], {
        queryParams: {
          region: params.region,
        },
      });

      return this.countryService.serchByRegion(params.region);
    },
  });
}
