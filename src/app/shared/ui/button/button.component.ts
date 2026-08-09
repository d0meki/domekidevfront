import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeHtmlPipe } from '@app/layout/pipe/safe-html.pipe';

@Component({
  selector: 'ui-button',
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './button.component.html',
  styles: ``,
  host: {},
})
export class ButtonComponent {
  @Input() size: 'sm' | 'md' = 'md';
  @Input() variant:
    'primary' | 'outline' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' =
    'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className = '';
  @Input() startIcon?: string; // SVG or icon class, or use ng-content for more flexibility
  @Input() endIcon?: string;

  @Output() btnClick = new EventEmitter<Event>();

  get sizeClasses(): string {
    return this.size === 'sm' ? 'px-4 py-3 text-sm' : 'px-5 py-3.5 text-sm';
  }

  get variantClasses(): string {
    switch (this.variant) {
      case 'primary':
        return 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300';
      case 'outline':
        return 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300';
      case 'danger':
        return 'bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300';
      case 'success':
        return 'bg-green-500 text-white shadow-theme-xs hover:bg-green-600 disabled:bg-green-300';
      case 'warning':
        return 'bg-yellow-500 text-white shadow-theme-xs hover:bg-yellow-600 disabled:bg-yellow-300';
      case 'info':
        return 'bg-blue-500 text-white shadow-theme-xs hover:bg-blue-600 disabled:bg-blue-300';
      case 'light':
        return 'bg-gray-200 text-gray-800 shadow-theme-xs hover:bg-gray-300 disabled:bg-gray-100';
      case 'dark':
        return 'bg-gray-800 text-white shadow-theme-xs hover:bg-gray-900 disabled:bg-gray-600';
      default:
        return '';
    }
  }

  get disabledClasses(): string {
    return this.disabled ? 'cursor-not-allowed opacity-50' : '';
  }

  onClick(event: Event) {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
