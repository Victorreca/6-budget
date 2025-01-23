import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { BudgetService } from '../services/budget.service';
@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  totalPriceBudget = 0;

  formBudget!: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formBudget = this.fb.group({
      seo: new FormControl(false),
      ads: new FormControl(false),
      web: new FormControl(false),
    });
  }

  calculateTotal() {
    this.totalPriceBudget = this.budgetService.calculateTotalPrice(
      this.formBudget
    );
  }
}
