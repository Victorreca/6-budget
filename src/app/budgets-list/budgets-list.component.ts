import { Component, computed, signal, Signal } from '@angular/core';
import { CurrentBudget } from '../interfaces/current-budget';
import { BudgetService } from '../services/budget.service';
import { SortByPriceComponent } from '../sort-buttons/sort-by-price/sort-by-price.component';
import { SortAlphabeticallyComponent } from '../sort-buttons/sort-alphabetically/sort-alphabetically.component';
import { SortByDateComponent } from '../sort-buttons/sort-by-date/sort-by-date.component';
@Component({
  selector: 'app-budgets-list',
  imports: [
    SortByPriceComponent,
    SortAlphabeticallyComponent,
    SortByDateComponent,
  ],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  private budgetsOriginal: Signal<CurrentBudget[]>;
  private sortByPriceAscending = signal<boolean | null>(null);
  private sortByNameAscending = signal<boolean | null>(null);
  private sortByDateAscending = signal<boolean | null>(null);

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
      } else if (this.sortByPriceAscending() !== null) {
        sortedBudgets.sort((a, b) =>
          this.sortByPriceAscending()
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice
        );
      } else if (this.sortByDateAscending() !== null) {
        sortedBudgets.sort((a, b) =>
          this.sortByDateAscending()
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }

      return sortedBudgets;
    });
  }

  updateSortByPrice(isAscending: boolean) {
    this.sortByPriceAscending.set(isAscending);
    this.sortByNameAscending.set(null);
    this.sortByDateAscending.set(null);
  }

  updateSortByName(isAscending: boolean) {
    this.sortByNameAscending.set(isAscending);
    this.sortByPriceAscending.set(null);
    this.sortByDateAscending.set(null);
  }

  updateSortByDate(isAscending: boolean) {
    this.sortByDateAscending.set(isAscending);
    this.sortByPriceAscending.set(null);
    this.sortByNameAscending.set(null);
  }
}
