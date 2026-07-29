import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { CheckboxComponent } from '@app/shared/forms/input/checkbox.component';
import { InputFieldComponent } from '@app/shared/forms/input/input-field.component';
import { LabelComponent } from '@app/shared/forms/label/label.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'login-page',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    CheckboxComponent,
    InputFieldComponent,
    LabelComponent,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export default class LoginPage {
  showPassword = false;
  isChecked = false;

  email = '';
  password = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.isChecked);
  }

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  // private messageService = inject(MessageService);

  isLoading = signal(false);
  isDarkTheme = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid || this.isLoading()) {
      // this.messageService.add({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: 'Por favor revise la información ingresada.',
      //   life: 3000,
      // });
      console.log("formulario incompleto");
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;
    this.isLoading.set(true);

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      
      if (isAuthenticated) {
        this.router.navigateByUrl('/dashboard/analytics');
        this.isLoading.set(false);
        return;
      }
      this.isLoading.set(false);
      // this.messageService.add({
      //   severity: 'error',
      //   summary: 'Error de autenticación',
      //   detail: 'Correo o contraseña incorrectos.',
      //   life: 3000,
      // });
      console.log("password o email incorrectos");
    });
  }

  toggleDarkMode() {
    this.isDarkTheme.update((val) => !val);
    document.documentElement.classList.toggle('dark', this.isDarkTheme());
  }
}
