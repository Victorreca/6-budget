import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule, PanelComponent],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  totalPriceBudget = 0;

  formBudget!: FormGroup;
  private numberPages = 1;
  private numberLanguages = 1;

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
  panelUpdate(event: { pages: number; languages: number }) {
    this.numberPages = event.pages;
    this.numberLanguages = event.languages;

    this.budgetService.updatePages(this.numberPages);
    this.budgetService.updateLanguages(this.numberLanguages);
    this.calculateTotal();
  }
}
