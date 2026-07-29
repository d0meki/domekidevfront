import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login-page',
  imports: [RouterModule],
  template: `<div class="min-h-screen"><router-outlet></router-outlet></div>`,
})
export default class AuthLayout {}
