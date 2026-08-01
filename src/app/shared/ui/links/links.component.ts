import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

type LinkColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'gray';
type LinkUnderline = 'always' | 'hover' | 'none';

@Component({
  selector: 'ui-links',
  imports: [RouterLink],
  template: `
    @if (routerLink) {
      <a [routerLink]="routerLink" [target]="target" [attr.rel]="relValue" [class]="linkClasses">
        <ng-content />
      </a>
    } @else {
      <a [href]="href" [target]="target" [attr.rel]="relValue" [class]="linkClasses">
        <ng-content />
      </a>
    }
  `,
})
export class LinksComponent {
  @Input() color: LinkColor = 'primary';
  @Input() underline: LinkUnderline = 'always';
  @Input() href = '#';
  @Input() routerLink: string | readonly unknown[] | null = null;
  @Input() target?: string;
  @Input() rel?: string;
  @Input() className = '';

  get linkClasses(): string {
    const colors: Record<LinkColor, string> = {
      primary: 'text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300',
      success:
        'text-success-600 hover:text-success-700 dark:text-success-500 dark:hover:text-success-400',
      error: 'text-error-600 hover:text-error-700 dark:text-error-500 dark:hover:text-error-400',
      warning:
        'text-warning-600 hover:text-warning-700 dark:text-warning-500 dark:hover:text-warning-400',
      info: 'text-blue-light-600 hover:text-blue-light-700 dark:text-blue-light-500 dark:hover:text-blue-light-400',
      gray: 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
    };

    const underlines: Record<LinkUnderline, string> = {
      always: 'underline underline-offset-4 decoration-1',
      hover: 'no-underline hover:underline hover:underline-offset-4',
      none: 'no-underline',
    };

    return `font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 rounded-sm ${colors[this.color]} ${underlines[this.underline]} ${this.className}`;
  }

  get relValue(): string | null {
    return this.rel ?? (this.target === '_blank' ? 'noopener noreferrer' : null);
  }
}
