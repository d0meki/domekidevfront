import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-drop-down',
  imports: [CommonModule],
  template: `@if (isOpen) {
    <div
      #dropdownRef
      [ngClass]="
        'absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ' +
        className
      "
    >
      <ng-content></ng-content>
    </div>
  }`,
  styleUrl: './drop-down.css',
})
export class DropDownComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() className = '';

  @ViewChild('dropdownRef') dropdownRef!: ElementRef<HTMLDivElement>;

  private handleClickOutside = (event: MouseEvent) => {
    if (
      this.isOpen &&
      this.dropdownRef &&
      this.dropdownRef.nativeElement &&
      !this.dropdownRef.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('.dropdown-toggle')
    ) {
      this.close.emit();
    }
  };

  ngAfterViewInit() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  ngOnDestroy() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}
