import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { InputFieldComponent } from '@app/shared/components/form/input/input-field.component';
@Component({
  selector: 'app-reactive-basic-page',
  imports: [ReactiveFormsModule, CommonModule, ComponentCardComponent, ButtonComponent, InputFieldComponent],
  templateUrl: './reactive-basic-page.html',
  styleUrl: './reactive-basic-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveBasicPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [, [Validators.required, Validators.min(10)]],
    inStorage: [, [Validators.required, Validators.min(0)]],
  });

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
