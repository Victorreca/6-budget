import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private prices = { seo: 300, ads: 400, web: 500 };
  private pageCost = 30;
  private numberPages = 1;
  private numberLanguages = 1;

  totalPrice = 0;

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
    this.totalPrice =
      (formValue.value.seo ? this.prices.seo : 0) +
      (formValue.value.ads ? this.prices.ads : 0) +
      (formValue.value.web
        ? this.prices.web +
          this.numberPages * this.numberLanguages * this.pageCost
        : 0);
    return this.totalPrice;
  }
}
