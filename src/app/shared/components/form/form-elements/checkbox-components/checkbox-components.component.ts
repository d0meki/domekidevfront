
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxComponent } from '../../input/checkbox.component';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';


@Component({
  selector: 'app-checkbox-components',
  imports: [ComponentCardComponent, CheckboxComponent],
  templateUrl: './checkbox-components.component.html',
  styles: ``
})
export class CheckboxComponentsComponent {

  isChecked = false;
  isCheckedTwo = true;
  isCheckedDisabled = false;
}
