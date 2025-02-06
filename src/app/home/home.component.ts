import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { CommonModule } from '@angular/common';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { BudgetFormService } from '../services/budget-form.service';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    PanelComponent,
    CommonModule,
    BudgetsListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    public budgetFormService: BudgetFormService,
    public budgetService: BudgetService
  ) {}

  panelUpdate(event: { pages: number; languages: number }) {
    this.budgetFormService.formBudget.patchValue({
      pages: event.pages,
      languages: event.languages,
    });

    this.budgetFormService.calculateTotal();
  }

  submitBudget(event: Event) {
    event.preventDefault();
    this.budgetFormService.submitBudget();
  }
}
