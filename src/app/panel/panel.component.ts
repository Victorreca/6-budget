import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../shared/popup/popup.component';
import { BudgetFormService } from '../services/budget-form.service';

@Component({
  selector: 'app-panel',
  imports: [CommonModule, PopupComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {
  numberPages: number = 1;
  numberLanguages: number = 1;

  @Output() updatePagesAndLanguages = new EventEmitter<{
    pages: number;
    languages: number;
  }>();

  constructor(private budgetFormService: BudgetFormService) {}

  ngOnInit(): void {
    this.numberPages =
      this.budgetFormService.formBudget.get('pages')?.value || 1;
    this.numberLanguages =
      this.budgetFormService.formBudget.get('languages')?.value || 1;
  }

  changeNumber(
    type: 'numberPages' | 'numberLanguages',
    operation: 'increase' | 'decrease'
  ) {
    if (operation === 'increase') {
      this[type]++;
    } else if (operation === 'decrease' && (this[type] as number) > 1) {
      this[type]--;
    }
    this.updateFormValues();
  }

  private updateFormValues() {
    this.budgetFormService.formBudget.patchValue({
      pages: this.numberPages,
      languages: this.numberLanguages,
    });

    this.budgetFormService.calculateTotal();

    this.updatePagesAndLanguages.emit({
      pages: this.numberPages,
      languages: this.numberLanguages,
    });
  }
}
