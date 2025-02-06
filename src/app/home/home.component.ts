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
import { ActivatedRoute, Params, Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.programmingOptions = this.budgetService.getProgrammingOptions();
    this.initializeForm();

    this.route.queryParams.subscribe((params) =>
      this.restoreBudgetFromURL(params)
    );

    this.formBudget.valueChanges.subscribe(() => this.updateURL());
  }

  private initializeForm(): void {
    this.formBudget = this.fb.group({
      seo: false,
      ads: false,
      web: false,
      pages: [this.numberPages],
      languages: [this.numberLanguages],
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{9,}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  private updateURL() {
    const isWebSelected = this.formBudget.get('web')?.value;

    const queryParams: Params = {
      WebPage: isWebSelected || null,
      CampaignSeo: this.formBudget.get('seo')?.value || null,
      Ads: this.formBudget.get('ads')?.value || null,
      pages: isWebSelected ? this.formBudget.get('pages')?.value : null,
      lang: isWebSelected ? this.formBudget.get('languages')?.value : null,
    };

    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  private restoreBudgetFromURL(params: Params) {
    const isWebSelected = params['WebPage'] === 'true';

    this.numberPages = isWebSelected
      ? params['pages']
        ? +params['pages']
        : 1
      : 1;
    this.numberLanguages = isWebSelected
      ? params['lang']
        ? +params['lang']
        : 1
      : 1;

    this.formBudget.patchValue({
      web: isWebSelected,
      seo: params['CampaignSeo'] === 'true',
      ads: params['Ads'] === 'true',
      pages: this.numberPages,
      languages: this.numberLanguages,
    });

    this.budgetService.updatePages(this.numberPages);
    this.budgetService.updateLanguages(this.numberLanguages);

    this.calculateTotal();
  }

  private calculateTotal() {
    this.totalPriceBudget = this.budgetService.calculateTotalPrice(
      this.formBudget
    );
  }
  panelUpdate(event: { pages: number; languages: number }) {
    this.numberPages = event.pages;
    this.numberLanguages = event.languages;

    this.formBudget.patchValue({
      pages: this.numberPages,
      languages: this.numberLanguages,
    });

    this.updateURL();

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

    const email = this.formBudget.get('email')?.value;

    if (this.budgetService.existsBudgetByEmail(email)) {
      alert('Aquest email ja està registrat. Introdueix un email diferent.');
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
      pages: this.formBudget.get('web')?.value ? this.numberPages : null,
      languages: this.formBudget.get('web')?.value
        ? this.numberLanguages
        : null,
      date: new Date(),
    };
    this.budgetService.addBudget(budgetNew);
  }
}
