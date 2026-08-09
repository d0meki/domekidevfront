// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormUtils } from '@app/reactive-form/utils/form.utils';
// import { Button } from 'primeng/button';
// import { Card } from 'primeng/card';
// import { Divider } from 'primeng/divider';
// import { InputTextModule } from 'primeng/inputtext';
// import { MessageModule } from 'primeng/message';

// @Component({
//   selector: 'app-register-page',
//   imports: [
//     ReactiveFormsModule,
//     CommonModule,
//     Divider,
//     Card,
//     InputTextModule,
//     Button,
//     MessageModule,
//   ],
//   templateUrl: './register-page.html',
//   styleUrl: './register-page.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export default class RegisterPage {
//   fb = inject(FormBuilder);

//   formUtils = FormUtils;

//   myForm = this.fb.group(
//     {
//       name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
//       email: [
//         '',
//         [Validators.required, Validators.pattern(FormUtils.emailPattern)],
//         [FormUtils.checkingServerResponse],
//       ],
//       username: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(6),
//           Validators.pattern(FormUtils.notOnlySpacesPattern),
//           FormUtils.notStrider,
//         ],
//       ],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       password2: ['', Validators.required],
//     },
//     {
//       validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')],
//     },
//   );

//   onSubmit() {
//     this.myForm.markAllAsTouched();
//     console.log(this.myForm.value);
//   }
// }
