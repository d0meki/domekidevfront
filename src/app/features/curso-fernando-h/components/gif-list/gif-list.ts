import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GifListItem } from './gif-list-item/gif-list-item';
import { Gif } from '../../interfaces/gif.interface';
// import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-gif-list',
  imports: [GifListItem],
  template: `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    @for (gif of gifs(); track gif) {
      <app-gif-list-item [imageUrl]="gif.url" />
    }
  </div>`,
  styleUrl: './gif-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifList {
  gifs = input.required<Gif[]>();
}
