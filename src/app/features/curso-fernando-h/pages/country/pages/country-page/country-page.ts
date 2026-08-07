import { CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CountryService } from '@app/features/curso-fernando-h/services/country.service';
import { AlertComponent } from '@app/shared/ui/alert/alert.component';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';
import { BadgeComponent } from '@app/shared/ui/badge/badge.component';
import { MyIconComponent } from '@app/shared/ui/my-icon';
import { ResponsiveImageComponent } from '@app/shared/ui/images/responsive-image/responsive-image.component';
// import { CountryService } from '@app/country/services/country.service';
// import { Card } from 'primeng/card';
// import { Tag } from 'primeng/tag';
// import { ImageModule } from 'primeng/image';
// import { Message } from 'primeng/message';
// import { ProgressSpinnerModule  } from 'primeng/progressspinner';

@Component({
  selector: 'app-country-page',
  imports: [
    AlertComponent,
    ComponentCardComponent,
    BadgeComponent,
    CommonModule,
    MyIconComponent,
    ResponsiveImageComponent,
  ],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountryPage {
  private countryCode = inject(ActivatedRoute).snapshot.params['code'];
  private countryService = inject(CountryService);
  private sanitizer = inject(DomSanitizer);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    },
  });

  mapUrl = computed(() => {
    if (!this.countryResource.hasValue()) return null;
    const name = this.countryResource.value()!.name;
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(name)}&output=embed&z=5`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
