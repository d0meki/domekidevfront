import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarService } from '@app/layout/services/admin-sidebar.service';
import { SharedThemeToogle } from "@app/shared/components/theme-toogle/theme-toogle";
import { AdminUserDropdown } from "../admin-user-dropdown/admin-user-dropdown";

@Component({
  selector: 'admin-header',
  imports: [CommonModule, RouterModule, SharedThemeToogle, AdminUserDropdown],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {
  isApplicationMenuOpen = false;
  readonly sidebarService = inject(AdminSidebarService);
  readonly isMobileOpen$ = this.sidebarService.isMobileOpen$;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  handleToggle() {
    if (window.innerWidth >= 1280) {
      this.sidebarService.toggleExpanded();
    } else {
      this.sidebarService.toggleMobileOpen();
    }
  }

  toggleApplicationMenu() {
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
  }

  ngAfterViewInit() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  };
}
