import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gif-list-item',
  imports: [],
  template: `<div>
    <img class="h-full w-full rounded-lg object-cover " [src]="imageUrl()" alt="" />
  </div>`,
  styleUrl: './gif-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItem {
  imageUrl = input.required<string>();
}
