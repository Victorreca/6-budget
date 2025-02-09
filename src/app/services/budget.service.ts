import { Injectable, signal } from '@angular/core';
import { BudgetOption } from '../interfaces/budget-option';
import { CurrentBudget } from '../interfaces/current-budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  budgetSignal = signal<CurrentBudget[]>([
    {
      name: 'Joan Pérez',
      phone: 654321987,
      email: 'joan@example.com',
      services: ['Web', 'Seo'],
      totalPrice: 830,
      pages: 1,
      languages: 2,
      date: new Date('2024-05-15'),
    },
    {
      name: 'Maria García',
      phone: 612345678,
      email: 'maria@example.com',
      services: ['Ads'],
      totalPrice: 400,
      date: new Date('2024-08-22'),
    },
  ]);

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

  getProgrammingOptions(): BudgetOption[] {
    return this.programmingOptions;
  }

  calculateTotalPrice(formValue: any): number {
    const webPrice = this.programmingOptions.find(
      (option) => option.id === 'web'
    )!.price;
    const seoPrice = this.programmingOptions.find(
      (option) => option.id === 'seo'
    )!.price;
    const adsPrice = this.programmingOptions.find(
      (option) => option.id === 'ads'
    )!.price;

    const selectedWebPrice = formValue.value.web ? webPrice : 0;
    const selectedSeoPrice = formValue.value.seo ? seoPrice : 0;
    const selectedAdsPrice = formValue.value.ads ? adsPrice : 0;

    const extraPages = formValue.value.pages - 1;
    const extraLanguages = formValue.value.languages - 1;

    const extraPagesCost = extraPages * this.pageCost;
    const extraLanguagesCost =
      (1 + extraPages) * extraLanguages * this.pageCost;

    return (
      selectedSeoPrice +
      selectedAdsPrice +
      selectedWebPrice +
      extraPagesCost +
      extraLanguagesCost
    );
  }

  getBudgets() {
    return this.budgetSignal;
  }

  addBudget(budget: CurrentBudget) {
    this.budgetSignal.update((prev) => [...prev, budget]);
  }
}
