import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';
import { BadgeComponent } from '@app/shared/ui/badge/badge.component';
import { LinksComponent } from '@app/shared/ui/links/links.component';

@Component({
  selector: 'country-list',
  imports: [
    DecimalPipe,
    RouterLink,
    ComponentCardComponent,
    BadgeComponent,
    LinksComponent,
  ],
  template: `
    <section class="mt-5">
      <app-component-card title="Sin titulo">
        <div
          class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3"
        >
          <div class="px-4 pt-4 sm:px-6">
            <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                  Recent Orders
                </h3>
              </div>
            </div>
          </div>
          <div class="max-w-full overflow-x-auto">
            <table class="w-full">
              <thead class="border-gray-100 border-y dark:border-white/5">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                  >
                    icono
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                  >
                    Bandera
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                  >
                    Capital
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                  >
                    Población
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                @for (country of countries(); track $index) {
                  <tr>
                    <td class="px-4 py-2 text-gray-500 dark:text-gray-300">
                      {{ $index + 1 }}
                    </td>
                    <td class="px-4 py-2 text-gray-500 dark:text-gray-300">
                      {{ country.cca2 }}
                    </td>
                    <td class="px-4 py-2 text-gray-500 dark:text-gray-300">
                      <img class="w-10" [src]="country.flagSvg" alt="{{ country.flag }}" />
                    </td>
                    <td class="px-4 py-2 text-gray-500 dark:text-gray-300">{{ country.name }}</td>
                    <td class="px-4 py-2 text-gray-500 dark:text-gray-300">
                      {{ country.capital }}
                    </td>
                    <td class="px-4 py-2 text-gray-500 dark:text-gray-300">
                      <app-badge severity="warn">{{ country.population | number }}</app-badge>
                    </td>
                    <td>
                      <ui-links
                        [routerLink]="['/bases/by/', country.cca2]"
                        color="warning"
                        >Mas Información</ui-links
                      >
                    </td>
                  </tr>
                }
              </tbody>
              <tfoot class="border-gray-100 border-y dark:border-white/5">
                @if (errorMessage()) {
                  <tr>
                    <td colspan="7" class="text-center">
                      {{ errorMessage()?.message }}
                    </td>
                  </tr>
                }
                @if (isEmpty() && !isLoading() && !errorMessage()) {
                  <tr>
                    <td colspan="7" class="text-center">Sin Registros</td>
                  </tr>
                }
                @if (isLoading()) {
                  <tr>
                    <td colspan="7" class="text-center">Buscando...</td>
                  </tr>
                }
              </tfoot>
            </table>
          </div>
        </div>
      </app-component-card>
    </section>
  `,
  styleUrl: './country-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
  countries = input.required<Country[]>();
  errorMessage = input<Error | undefined>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
