import { Pipe, type PipeTransform } from '@angular/core';
import { Color } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroColor',
})
export class HeroColorPipe implements PipeTransform {
  transform(value: Color): string {
    return Color[value];
  }
}
