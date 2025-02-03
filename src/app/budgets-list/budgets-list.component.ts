import { Component, computed, signal, Signal } from '@angular/core';
import { CurrentBudget } from '../interfaces/current-budget';
import { BudgetService } from '../services/budget.service';
import { SortByPriceComponent } from '../sort-buttons/sort-by-price/sort-by-price.component';
import { SortAlphabeticallyComponent } from '../sort-buttons/sort-alphabetically/sort-alphabetically.component';
@Component({
  selector: 'app-budgets-list',
  imports: [SortByPriceComponent, SortAlphabeticallyComponent],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  private budgetsOriginal: Signal<CurrentBudget[]>;
  private sortByPriceAscending = signal<boolean | null>(null);
  private sortByNameAscending = signal<boolean | null>(null);

  budgets: Signal<CurrentBudget[]>;

  constructor(private budgetService: BudgetService) {
    this.budgetsOriginal = this.budgetService.getBudgets();

    this.budgets = computed(() => {
      let sortedBudgets = [...this.budgetsOriginal()];

      if (this.sortByNameAscending() !== null) {
        sortedBudgets.sort((a, b) =>
          this.sortByNameAscending()
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      }
      if (this.sortByPriceAscending() !== null) {
        sortedBudgets.sort((a, b) =>
          this.sortByPriceAscending()
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice
        );
      }
      return sortedBudgets;
    });
  }

  updateSortByPrice(isAscending: boolean) {
    this.sortByPriceAscending.set(isAscending);
    this.sortByNameAscending.set(null);
  }

  updateSortByName(isAscending: boolean) {
    this.sortByNameAscending.set(isAscending);
    this.sortByPriceAscending.set(null);
  }
}
