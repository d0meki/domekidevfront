import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Character } from '@app/features/curso-fernando-h/interfaces/character.interface';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterList {
  characters = input.required<Character[]>();
  listName = input.required<string>();
}
