import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BudgetService } from './budget.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CurrentBudget } from '../interfaces/current-budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetFormService {
  formBudget!: FormGroup;
  totalPriceBudget = 0;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formBudget = this.initializeForm();
    this.listenToQueryParams();
    this.listenToFormChanges();
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      seo: false,
      ads: false,
      web: false,
      pages: [1],
      languages: [1],
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{9,}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  private listenToQueryParams(): void {
    this.route.queryParams.subscribe((params) =>
      this.restoreBudgetFromURL(params)
    );
  }

  private listenToFormChanges(): void {
    this.formBudget.valueChanges.subscribe(() => this.updateURL());
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

    const pages = isWebSelected ? (params['pages'] ? +params['pages'] : 1) : 1;
    const languages = isWebSelected
      ? params['lang']
        ? +params['lang']
        : 1
      : 1;

    this.formBudget.patchValue({
      web: isWebSelected,
      seo: params['CampaignSeo'] === 'true',
      ads: params['Ads'] === 'true',
      pages,
      languages,
    });

    this.calculateTotal();
  }
  calculateTotal() {
    this.totalPriceBudget = this.budgetService.calculateTotalPrice(
      this.formBudget
    );
  }
  existsBudgetByEmail(emailExist: string): boolean {
    return this.budgetService
      .budgetSignal()
      .some((budget) => budget.email === emailExist);
  }

  submitBudget(): boolean {
    if (this.formBudget.invalid) {
      this.formBudget.markAllAsTouched();
      return false;
    }

    const form = this.formBudget.value;
    const email = form.email;

    if (this.existsBudgetByEmail(email)) {
      alert('Aquest email ja està registrat.');
      return false;
    }

    const budgetNew: CurrentBudget = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      services: ['Web', 'SEO', 'Ads'].filter(
        (service) => form[service.toLowerCase()]
      ),
      totalPrice: this.totalPriceBudget,
      pages: form.web ? form.pages : null,
      languages: form.web ? form.languages : null,
      date: new Date(),
    };
    this.budgetService.addBudget(budgetNew);
    return true;
  }
}
