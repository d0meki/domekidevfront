import { Component, inject } from '@angular/core';
import AdminSidebar from '../admin-sidebar/admin-sidebar';
import { AdminBackdrop } from '../admin-backdrop/admin-backdrop';
import { CommonModule } from '@angular/common';
import { AdminSidebarService } from '@app/layout/services/admin-sidebar.service';
import { AdminHeader } from '../admin-header/admin-header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-layout',
  imports: [CommonModule, AdminSidebar, AdminBackdrop, AdminHeader, RouterModule],
  template: `<div class="min-h-screen xl:flex">
    <div>
      <admin-sidebar></admin-sidebar>
      <admin-backdrop></admin-backdrop>
    </div>
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      [ngClass]="{
        'xl:ml-72.5': (isExpanded$ | async) || (isHovered$ | async),
        'xl:ml-22.5': !(isExpanded$ | async) && !(isHovered$ | async),
        'ml-0': (isMobileOpen$ | async),
      }"
    >
      <!-- app header start -->
      <!-- <app-header /> -->
      <admin-header />
      <!-- app header end -->
      <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div> `,
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  readonly sidebarService = inject(AdminSidebarService);

  readonly isExpanded$ = this.sidebarService.isExpanded$;
  readonly isMobileOpen$ = this.sidebarService.isMobileOpen$;
  readonly isHovered$ = this.sidebarService.isHovered$;
}
