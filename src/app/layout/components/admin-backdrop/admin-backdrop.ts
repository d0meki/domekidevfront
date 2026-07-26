import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AdminSidebarService } from '@app/layout/services/admin-sidebar.service';

@Component({
  selector: 'admin-backdrop',
  imports: [CommonModule],
  template: `@if (isMobileOpen$ | async) {
    <div class="fixed inset-0 z-40 bg-gray-900/50 lg:hidden" (click)="closeSidebar()"></div>
  } `,
  styleUrl: './admin-backdrop.css',
})
export class AdminBackdrop {
  readonly sidebarService = inject(AdminSidebarService);
  readonly isMobileOpen$ = this.sidebarService.isMobileOpen$;

  closeSidebar() {
    this.sidebarService.setMobileOpen(false);
  }
}
