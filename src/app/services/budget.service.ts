import { Injectable, signal } from '@angular/core';
import { BudgetOption } from '../interfaces/budget-option';
import { CurrentBudget } from '../interfaces/current-budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  budgetSignal = signal<CurrentBudget[]>([]);

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

  constructor() {
    this.budgetSignal.set([
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
        date: new Date('2024-03-22'),
      },
    ]);
  }

  getProgrammingOptions(): BudgetOption[] {
    return this.programmingOptions;
  }

  calculateTotalPrice(formValue: any): number {
    const webOption = this.programmingOptions.find(
      (option) => option.id === 'web'
    )!;

    return (
      (formValue.value.seo
        ? this.programmingOptions.find((option) => option.id === 'seo')!.price
        : 0) +
      (formValue.value.ads
        ? this.programmingOptions.find((option) => option.id === 'ads')!.price
        : 0) +
      (formValue.value.web
        ? webOption.price +
          formValue.value.pages * this.pageCost +
          formValue.value.languages * this.pageCost
        : 0)
    );
  }

  getBudgets() {
    return this.budgetSignal;
  }

  addBudget(budget: CurrentBudget) {
    this.budgetSignal.update((prev) => [...prev, budget]);
  }
}
