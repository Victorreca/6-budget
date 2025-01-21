import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  totalPrice = 0;

  formBudget!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formBudget = this.fb.group({
      seo: new FormControl(false),
      ads: new FormControl(false),
      web: new FormControl(false),
    });
  }

  calculateTotalPrice() {
    const prices = { seo: 300, ads: 400, web: 500 };
    this.totalPrice =
      (this.formBudget.value.seo ? prices.seo : 0) +
      (this.formBudget.value.ads ? prices.ads : 0) +
      (this.formBudget.value.web ? prices.web : 0);
  }
}
