import { Component } from '@angular/core';
import { BudgetsListComponent } from './budgets-list/budgets-list.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [BudgetsListComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pressupostos';
}
