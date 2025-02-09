import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-by-date',
  imports: [CommonModule],
  templateUrl: './sort-by-date.component.html',
  styleUrl: './sort-by-date.component.scss',
})
export class SortByDateComponent {
  @Output() sortByDate = new EventEmitter<boolean>();
  @Input() isActive: boolean = false;

  isAscending = false;

  toggleSortByDate() {
    this.isAscending = !this.isAscending;
    this.sortByDate.emit(this.isAscending);
  }
}
