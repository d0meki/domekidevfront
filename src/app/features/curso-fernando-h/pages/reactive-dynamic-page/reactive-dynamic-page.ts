import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { ComponentCardComponent } from "@app/shared/components/common/component-card.component";
import { AlertComponent } from "@app/shared/ui/alert/alert.component";
import { ButtonComponent } from "@app/shared/ui/button/button.component";
import { InputFieldComponent } from "@app/shared/components/form/input/input-field.component";

@Component({
  selector: 'app-reactive-dynamic-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ComponentCardComponent,
    AlertComponent,
    ButtonComponent,
    InputFieldComponent
],
  templateUrl: './reactive-dynamic-page.html',
  styleUrl: './reactive-dynamic-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveDynamicPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ],
      Validators.minLength(2),
    ),
  });

  newFavorite = new FormControl('', Validators.required);
  // newFavorite = this.fb.control([])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
