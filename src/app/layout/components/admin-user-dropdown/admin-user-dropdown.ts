import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/features/auth/services/auth.service';
import { DropDownComponent } from "@app/shared/ui/drop-down/drop-down";
import { DropdownItemTwoComponent } from "@app/shared/ui/drop-down/dropdown-item/dropdown-item.component-two";

@Component({
  selector: 'admin-user-dropdown',
  imports: [CommonModule, DropDownComponent, DropdownItemTwoComponent],
  templateUrl: './admin-user-dropdown.html',
  styleUrl: './admin-user-dropdown.css',
})
export class AdminUserDropdown {
  isOpen = false;
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly user = this.authService.user;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeDropdown();
    void this.router.navigateByUrl('/auth/login');
  }
}
