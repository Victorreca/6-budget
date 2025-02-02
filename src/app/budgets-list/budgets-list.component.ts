import { Component, Signal } from '@angular/core';
import { CurrentBudget } from '../interfaces/current-budget';
import { BudgetService } from '../services/budget.service';
@Component({
  selector: 'app-budgets-list',
  imports: [],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  budgets: Signal<CurrentBudget[]>;

  constructor(private budgetService: BudgetService) {
    this.budgets = this.budgetService.getBudgets();
  }
}
