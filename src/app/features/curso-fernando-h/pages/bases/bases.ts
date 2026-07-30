import { Component, computed, inject, signal } from '@angular/core';
import { PageBreadcrumbComponent } from '@app/shared/components/common/page-breadcrumb.component';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { DragonballService } from '../../services/dragonball.service';
import { CharacterAdd } from '../../components/dragonball/character-add/character-add';
import { CharacterList } from '../../components/dragonball/character-list/character-list';

@Component({
  selector: 'app-bases',
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    ComponentCardComponent,
    ButtonComponent,
    CharacterAdd,
    CharacterList,
  ],
  templateUrl: './bases.html',
  styleUrl: './bases.css',
})
export default class Bases {
  public dragonballService = inject(DragonballService);
  counter = 10;
  counterSignal = signal(10);
  name = signal('Ironman');
  age = signal(45);

  constructor() {}

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }

  heroDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description;
  });

  capitalizedName = computed(() => this.name().toUpperCase());

  changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  changeAge() {
    this.age.set(60);
  }

  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }
}
