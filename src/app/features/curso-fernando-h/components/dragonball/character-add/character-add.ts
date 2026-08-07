import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "@app/shared/ui/button/button.component";
import { Character } from '@app/features/curso-fernando-h/interfaces/character.interface';
import { InputFieldComponent } from '@app/shared/components/form/input/input-field.component';
@Component({
  selector: 'app-character-add',
  imports: [FormsModule, CommonModule, InputFieldComponent, ButtonComponent],
  templateUrl: './character-add.html',
  styleUrl: './character-add.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAdd {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    };

    // this.characters.update((list) => [...list, newCharacter]);
    this.newCharacter.emit(newCharacter);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
