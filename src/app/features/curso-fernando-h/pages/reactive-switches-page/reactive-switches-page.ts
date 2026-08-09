// import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
// import { Divider } from 'primeng/divider';
// import { Card } from 'primeng/card';
// import { RadioButton } from 'primeng/radiobutton';
// import {
//   FormBuilder,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { InputTextModule } from 'primeng/inputtext';
// import { Button } from 'primeng/button';
// import { MessageModule } from 'primeng/message';
// import { ToggleSwitchModule } from 'primeng/toggleswitch';
// import { CheckboxModule } from 'primeng/checkbox';
// import { FormUtils } from '@app/reactive-form/utils/form.utils';
// @Component({
//   selector: 'app-reactive-switches-page',
//   imports: [
//     Divider,
//     Card,
//     RadioButton,
//     ReactiveFormsModule,
//     CommonModule,
//     Divider,
//     Card,
//     InputTextModule,
//     Button,
//     MessageModule,
//     FormsModule,
//     ToggleSwitchModule,
//     CheckboxModule,
//   ],
//   templateUrl: './reactive-switches-page.html',
//   styleUrl: './reactive-switches-page.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export default class ReactiveSwitchesPage {
//   private fb = inject(FormBuilder);
//   formUtils = FormUtils;

//   myForm: FormGroup = this.fb.group({
//     gender: ['M', Validators.required],
//     wantNotifications: [true],
//     termAndConditions: [false, Validators.requiredTrue],
//   });

//   onSubmit() {
//     this.myForm.markAllAsTouched();

//     console.log(this.myForm.value);
//   }
// }
