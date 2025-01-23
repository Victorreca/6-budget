import { Component } from '@angular/core';
import { BudgetsListComponent } from './budgets-list/budgets-list.component';

@Component({
  selector: 'app-root',
  imports: [BudgetsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pressupostos';
}
