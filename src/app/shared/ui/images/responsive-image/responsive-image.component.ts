import { Component, input } from '@angular/core';

@Component({
  selector: 'app-responsive-image',
  imports: [],
  template: `
    <div class="relative">
      <div class="overflow-hidden">
        <img
          [src]="src()"
          [alt]="alt()"
          class="w-full border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class ResponsiveImageComponent {
  readonly src = input<string>('');
  readonly alt = input<string>('');
}
