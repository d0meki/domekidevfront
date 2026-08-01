import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '@app/features/curso-fernando-h/services/country.service';
import { SearchInput } from "@app/features/curso-fernando-h/components/search-input/search-input";
import { CountryList } from "@app/features/curso-fernando-h/components/country-list/country-list";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  template: `
    <!-- <p-toast /> -->
    <country-search-input
      placeholder="Buscar Por Capital"
      (value)="query.set($event)"
      [initialValue]="query()"
    />

    <country-list
      [countries]="countryResource.hasValue() ? countryResource.value()! : []"
      [errorMessage]="errorMessage()"
      [isEmpty]="isEmpty()"
      [isLoading]="countryResource.isLoading()"
    />
  `,
  styleUrl: './by-capital-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCapitalPage {
  // private messageService = inject(MessageService);
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = toSignal(
    this.activatedRoute.queryParamMap.pipe(map((params) => params.get('query') ?? '')),
    { initialValue: this.activatedRoute.snapshot.queryParamMap.get('query') ?? '' },
  );

  query = linkedSignal(() => this.queryParam());

  errorMessage = computed((): Error | undefined => {
    const err = this.countryResource.error();
    if (!err) return undefined;
    return err instanceof Error ? err : new Error('Error desconocido');
  });

  isEmpty = computed(() => {
    if (!this.countryResource.hasValue()) return false;
    return this.countryResource.value()!.length === 0;
  });

  constructor() {
    // Creamos un efecto que escuche la señal .error() del recurso
    effect(() => {
      const err = this.countryResource.error();

      if (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: message,
        //   life: 5000,
        // });

        console.error(err);
      }
    });
  }

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      this.router.navigate(['/bases/capital'], {
        queryParams: {
          query: params.query,
        },
      });
      return this.countryService.searchByCapital(params.query);
    },
  });
}

