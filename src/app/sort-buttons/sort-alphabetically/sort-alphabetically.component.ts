import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-alphabetically',
  imports: [],
  templateUrl: './sort-alphabetically.component.html',
  styleUrl: './sort-alphabetically.component.scss',
})
export class SortAlphabeticallyComponent {
  @Output() sortAlphabetically = new EventEmitter<boolean>();

  isAscending = true;

  toggleSortAlphbetically() {
    this.isAscending = !this.isAscending;
    this.sortAlphabetically.emit(this.isAscending);
  }
}
