import { booleanAttribute, Component, Input } from '@angular/core';

export interface IconDefinition {
  name: string;
  paths: readonly string[];
}

export const ICON_DEFINITIONS: readonly IconDefinition[] = [
  {
    name: 'users',
    paths: [
      'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
    ],
  },
  {
    name: 'home',
    paths: [
      'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75',
    ],
  },
  {
    name: 'search',
    paths: ['m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.197 5.197a7.5 7.5 0 0 0 10.606 10.606Z'],
  },
  {
    name: 'settings',
    paths: [
      'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.283.708.601.91l.51.306c.318.19.706.256 1.064.168l1.244-.303a1.125 1.125 0 0 1 1.279.569l1.297 2.247c.275.478.154 1.084-.276 1.435l-1.013.825c-.295.24-.45.614-.45.996v.612c0 .382.155.756.45.996l1.013.825c.43.351.551.957.276 1.435l-1.297 2.247a1.125 1.125 0 0 1-1.279.57l-1.244-.304a1.125 1.125 0 0 0-1.064.168l-.51.306a1.125 1.125 0 0 0-.601.91l-.213 1.281c-.09.542-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.601-.91l-.51-.306a1.125 1.125 0 0 0-1.064-.168l-1.244.303a1.125 1.125 0 0 1-1.279-.569l-1.297-2.247a1.125 1.125 0 0 1 .276-1.435l1.013-.825c.295-.24.45-.614.45-.996v-.612c0-.382-.155-.756-.45-.996l-1.013-.825a1.125 1.125 0 0 1-.276-1.435l1.297-2.247a1.125 1.125 0 0 1 1.279-.57l1.244.304c.358.088.746.022 1.064-.168l.51-.306c.318-.19.538-.536.601-.91l.213-1.281Z',
      'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    ],
  },
  {
    name: 'bell',
    paths: [
      'M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.556 1.083 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0',
    ],
  },
  {
    name: 'globe',
    paths: [
      'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
    ],
  },
  {
    name: 'map',
    paths: [
      'M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z',
    ],
  },
  {
    name: 'location',
    paths: [
      'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
      'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
    ],
  },
] as const;

const ICONS = new Map(ICON_DEFINITIONS.map((definition) => [definition.name, definition]));

@Component({
  selector: 'my-icon',
  template: `
    @if (iconDefinition; as definition) {
      <svg
        [attr.width]="size"
        [attr.height]="size"
        viewBox="0 0 24 24"
        fill="none"
        [attr.stroke]="color"
        [attr.stroke-width]="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        [attr.role]="isDecorative ? null : 'img'"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-hidden]="isDecorative ? 'true' : null"
        [attr.focusable]="false"
        [class]="iconClasses"
        [style.transform]="rotationStyle"
      >
        @if (title && !isDecorative) {
          <title>{{ title }}</title>
        }
        @for (path of definition.paths; track path) {
          <path [attr.d]="path" />
        }
      </svg>
    }
  `,
})
export class MyIconComponent {
  @Input() name = 'users';
  @Input() size: number | string = 24;
  @Input() className = '';
  @Input() strokeWidth: number | string = 1.5;
  @Input() color = 'currentColor';
  @Input() title?: string;
  @Input() ariaLabel?: string;
  @Input({ transform: booleanAttribute }) decorative = false;
  @Input({ transform: booleanAttribute }) spin = false;
  @Input() rotate?: number | string;

  get iconDefinition(): IconDefinition | undefined {
    return ICONS.get(this.name);
  }

  get isDecorative(): boolean {
    return this.decorative || (!this.title && !this.ariaLabel);
  }

  get iconClasses(): string {
    return [this.className, this.spin ? 'animate-spin' : ''].filter(Boolean).join(' ');
  }

  get rotationStyle(): string | null {
    return this.rotate === undefined ? null : `rotate(${this.rotate}deg)`;
  }
}
