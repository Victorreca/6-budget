import { Injectable } from '@angular/core';
import { BudgetOption } from '../interfaces/budget-option';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private programmingOptions: BudgetOption[] = [
    {
      id: 'seo',
      title: 'Seo',
      description: 'Optimització dels motors de cerca',
      price: 300,
    },
    {
      id: 'ads',
      title: 'Ads',
      description: 'Campanyes de publicitat en línia',
      price: 400,
    },
    {
      id: 'web',
      title: 'Web',
      description: "Programació d'una web responsive completa",
      price: 500,
    },
  ];

  private pageCost = 30;
  private numberPages = 1;
  private numberLanguages = 1;

  totalPrice = 0;

  getProgrammingOptions(): BudgetOption[] {
    return this.programmingOptions;
  }

  updatePages(pages: number) {
    this.numberPages = pages;
  }

  updateLanguages(languages: number) {
    this.numberLanguages = languages;
  }

  getNumberLanguages(): number {
    return this.numberLanguages;
  }

  getNumberPages(): number {
    return this.numberPages;
  }

  constructor() {}
  calculateTotalPrice(formValue: any): number {
    const webOptionPrice = this.programmingOptions.find(
      (option) => option.id === 'web'
    )!.price;

    this.totalPrice =
      (formValue.value.seo
        ? this.programmingOptions.find((option) => option.id === 'seo')!.price
        : 0) +
      (formValue.value.ads
        ? this.programmingOptions.find((option) => option.id === 'ads')!.price
        : 0) +
      (formValue.value.web
        ? webOptionPrice +
          this.numberPages * this.pageCost +
          this.numberLanguages * this.pageCost
        : 0);
    return this.totalPrice;
  }
}
