import { Component } from '@angular/core';
import { RadioComponent } from '../../input/radio.component';
import { FormsModule } from '@angular/forms';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';

@Component({
  selector: 'app-radio-buttons',
  imports: [
    ComponentCardComponent,
    RadioComponent,
    FormsModule
  ],
  templateUrl: './radio-buttons.component.html',
  styles: ``
})
export class RadioButtonsComponent {

  selectedValue: string = 'option2';

  handleRadioChange(value: string) {
    console.log(value,'value')
    this.selectedValue = value;
  }
}
