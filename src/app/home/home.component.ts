import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { BudgetOption } from '../interfaces/budget-option';
import { PanelComponent } from '../panel/panel.component';
import { CommonModule } from '@angular/common';
import { CurrentBudget } from '../interfaces/current-budget';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

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
export class HomeComponent implements OnInit {
  totalPriceBudget = 0;

  formBudget!: FormGroup;
  programmingOptions: BudgetOption[] = [];

  private numberPages = 1;
  private numberLanguages = 1;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.programmingOptions = this.budgetService.getProgrammingOptions();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formBudget = this.fb.group({
      seo: false,
      ads: false,
      web: false,
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{9,}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  submitBudget(event: Event) {
    event.preventDefault();

    if (this.formBudget.invalid) {
      this.formBudget.markAllAsTouched();
      return;
    }

    const selectedServices = this.programmingOptions
      .filter((option) => this.formBudget.get(option.id)?.value)
      .map((option) => option.title);

    const budgetNew: CurrentBudget = {
      name: this.formBudget.get('name')?.value,
      phone: this.formBudget.get('phone')?.value,
      email: this.formBudget.get('email')?.value,
      services: selectedServices,
      totalPrice: this.totalPriceBudget,
    };
    this.budgetService.addBudget(budgetNew);
  }
}
