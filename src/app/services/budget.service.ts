import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private prices = { seo: 300, ads: 400, web: 500 };
  totalPrice = 0;

  constructor() {}
  calculateTotalPrice(formValue: any): number {
    this.totalPrice =
      (formValue.value.seo ? this.prices.seo : 0) +
      (formValue.value.ads ? this.prices.ads : 0) +
      (formValue.value.web ? this.prices.web : 0);
    return this.totalPrice;
  }
}
