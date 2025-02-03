import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-by-date',
  imports: [],
  templateUrl: './sort-by-date.component.html',
  styleUrl: './sort-by-date.component.scss',
})
export class SortByDateComponent {
  @Output() sortByDate = new EventEmitter<boolean>();

  isAscending = true;

  toggleSortByDate() {
    this.isAscending = !this.isAscending;
    this.sortByDate.emit(this.isAscending);
  }
}
