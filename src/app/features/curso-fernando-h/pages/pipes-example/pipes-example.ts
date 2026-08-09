import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ComponentCardComponent } from '@app/shared/components/common/component-card.component';
import { AvailableLocale, PipeService } from '../../services/pipe.service';
import { interval, map, tap } from 'rxjs';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canadá',
};

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá',
};
@Component({
  selector: 'app-pipes-example',
  imports: [CommonModule, ComponentCardComponent, ButtonComponent],
  templateUrl: './pipes-example.html',
  styleUrl: './pipes-example.css',
})
export default class PipesExample {
  localeService = inject(PipeService);
  currentLocale = this.localeService.locale;

  nameLower = signal('freddy domeki');
  nameUpper = signal('FREDDY DOMEKI');
  fullName = signal('FrEDDy DOmEki');

  totalSells = signal(2_433_232.5567);
  percent = signal(0.4856);

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  changeLocale(locale: AvailableLocale) {
    console.log({ locale });
    this.localeService.changeLocale(locale);
  }

  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  // i18n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando',
  });

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos',
  ]);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }

  // KeyValue Pipe
  profile = {
    name: 'Fernando',
    age: 39,
    address: 'Ottawa, Canada',
  };

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Tenemos un error en la data');
      resolve('Tenemos data en la promesa.');
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval(2000).pipe(map((value) => value + 1));
}
