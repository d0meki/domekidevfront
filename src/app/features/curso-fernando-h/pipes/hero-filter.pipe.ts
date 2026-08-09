import { Pipe, type PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroFilter',
})
export class HeroFilterPipe implements PipeTransform {
  transform(value: Hero[], search: string | number): Hero[] {
    if (!search) return value;

    //solo hacer esto si el tipo es string
    if (typeof search === 'string') search = search.toLowerCase();

    return value.filter((hero) => hero.name.toLowerCase().includes(search as string));
  }
}
