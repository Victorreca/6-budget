import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-search',
  imports: [FormsModule],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.scss',
})
export class FilterSearchComponent {
  @Output() searchTerm = new EventEmitter<string>();
  searchValue: string = '';
  applyFilter() {
    this.searchTerm.emit(this.searchValue.trim());
  }
}
