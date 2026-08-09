// import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
// import { Divider } from 'primeng/divider';
// import { Card } from 'primeng/card';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormsService } from '@app/reactive-form/services/forms.service';
// import { filter, switchMap, tap } from 'rxjs';
// import { Select } from 'primeng/select';
// import { CountryForm } from '@app/reactive-form/interfaces/form-country.interface';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-form-country-page',
//   imports: [Divider, Card, ReactiveFormsModule, Select, CommonModule],
//   templateUrl: './form-country-page.html',
//   styleUrl: './form-country-page.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export default class FormCountryPage {
//   fb = inject(FormBuilder);
//   countryService = inject(FormsService);

//   regions = signal(this.countryService.regions);

//   countriesByRegion = signal<CountryForm[]>([]);
//   borders = signal<CountryForm[]>([]);

//   myForm = this.fb.group({
//     region: ['', Validators.required],
//     country: ['', Validators.required],
//     border: ['', Validators.required],
//   });

//   onFormChanged = effect((onCleanup) => {
//     const regionSubscription = this.onRegionChanged();
//     const countrySubscription = this.onCountryChanged();

//     onCleanup(() => {
//       regionSubscription.unsubscribe();
//       countrySubscription.unsubscribe();
//     });
//   });

//   onRegionChanged() {
//     return this.myForm
//       .get('region')!
//       .valueChanges.pipe(
//         tap(() => this.myForm.get('country')!.setValue('')),
//         tap(() => this.myForm.get('border')!.setValue('')),
//         tap(() => {
//           this.borders.set([]);
//           this.countriesByRegion.set([]);
//         }),
//         switchMap((region) => this.countryService.getCountriesByRegion(region ?? '')),
//       )
//       .subscribe((countries) => {
//         this.countriesByRegion.set(countries);
//       });
//   }

//   onCountryChanged() {
//     return this.myForm
//       .get('country')!
//       .valueChanges.pipe(
//         tap(() => this.myForm.get('border')!.setValue('')),
//         filter((value) => value!.length > 0),
//         switchMap((alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
//         switchMap((country) => this.countryService.getCountryNamesByCodeArray(country.borders)),
//       )
//       .subscribe((borders) => {
//         this.borders.set(borders);
//       });
//   }
// }
