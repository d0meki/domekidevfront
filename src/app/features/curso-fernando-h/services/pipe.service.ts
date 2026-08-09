import { Injectable, signal } from '@angular/core';
export type AvailableLocale = 'es' | 'fr' | 'en';

@Injectable({
  providedIn: 'root',
})
export class PipeService {
  private currentLocale = signal<AvailableLocale>('es');
  readonly locale = this.currentLocale.asReadonly();

  constructor() {
    const storedLocale = localStorage.getItem('locale');

    if (this.isAvailableLocale(storedLocale)) {
      this.currentLocale.set(storedLocale);
    }
  }

  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: AvailableLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
  }

  private isAvailableLocale(locale: string | null): locale is AvailableLocale {
    return locale === 'es' || locale === 'fr' || locale === 'en';
  }
}
