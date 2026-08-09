import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

//pipes
import { CommonModule } from '@angular/common';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { HeroColorPipe } from '../../pipes/heroColor.pipe';
import { HeroCreatorPipe } from '../../pipes/hero-creator.pipe';
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe';
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { Hero } from '../../interfaces/heroes.interface';
import { heroes } from '../../data/heroes.data';
import { InputFieldComponent } from '@app/shared/components/form/input/input-field.component';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    HeroCreatorPipe,
    HeroTextColorPipe,
    HeroSortByPipe,
    HeroFilterPipe,
    CommonModule,
    ComponentCardComponent,
    ButtonComponent,
    InputFieldComponent,
  ],
  templateUrl: './custom-page.html',
  styleUrl: './custom-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomPage {
  name = signal('Freddy Domeki');

  upperCase = signal(true);

  heroes = signal(heroes);

  sortBy = signal<keyof Hero | null>(null);

  searchQuery = signal<string | number>('');
}
