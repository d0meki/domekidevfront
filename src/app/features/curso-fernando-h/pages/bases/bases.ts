import { Component, signal } from '@angular/core';
import { PageBreadcrumbComponent } from '@app/shared/components/common/page-breadcrumb.component';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { InputFieldComponent } from "@app/shared/forms/input/input-field.component";
export interface Character {
  id: number;
  name: string;
  power: number;
}
@Component({
  selector: 'app-bases',
  imports: [PageBreadcrumbComponent, ComponentCardComponent, ButtonComponent, InputFieldComponent],
  templateUrl: './bases.html',
  styleUrl: './bases.css',
})
export default class Bases {
  counter = 10;
  counterSignal = signal(10);

  constructor() {}

  increaseBy(value: number) {
    this.counter += value;
    // this.counterSignal.set(this.counterSignal() + value);
    this.counterSignal.update((current) => current + value);
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }

  name = signal<string>('');
  power = signal<number>(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 4, name: 'Yamcha', power: 500 },
    // { id: 3, name: 'Piccolo', power: 3000 },
  ]);

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // });

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    this.characters.update((list) => [...list, newCharacter]);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
