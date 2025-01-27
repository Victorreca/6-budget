import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {
  numberPages: number = 1;
  numberLlanguages: number = 1;

  ngOnInit(): void {
    this.numberPages = this.budgetService.getNumberPages();
    this.numberLlanguages = this.budgetService.getNumberLanguages();
  }

  @Output() updatePagesAndLanguages = new EventEmitter<{
    pages: number;
    languages: number;
  }>();

  constructor(private budgetService: BudgetService) {}

  increaseNumberPages() {
    this.numberPages++;
    this.budgetService.updatePages(this.numberPages);
    this.emitUpdatePagesLanguages();
  }
  decreaseNumberPages() {
    if (this.numberPages > 1) {
      this.numberPages--;
      this.budgetService.updatePages(this.numberPages);
      this.emitUpdatePagesLanguages();
    }
  }

  increaseNumberLanguages() {
    this.numberLlanguages++;
    this.budgetService.updateLanguages(this.numberLlanguages);
    this.emitUpdatePagesLanguages();
  }
  descreaseNumberLanguages() {
    if (this.numberLlanguages > 1) {
      this.numberLlanguages--;
      this.budgetService.updatePages(this.numberLlanguages);
      this.emitUpdatePagesLanguages();
    }
  }

  private emitUpdatePagesLanguages() {
    this.updatePagesAndLanguages.emit({
      pages: this.numberPages,
      languages: this.numberLlanguages,
    });
  }
}
