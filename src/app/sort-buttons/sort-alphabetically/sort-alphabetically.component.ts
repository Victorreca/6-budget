import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-alphabetically',
  imports: [CommonModule],
  templateUrl: './sort-alphabetically.component.html',
  styleUrl: './sort-alphabetically.component.scss',
})
export class SortAlphabeticallyComponent {
  @Output() sortAlphabetically = new EventEmitter<boolean>();
  @Input() isActive: boolean = false;

  isAscending = true;

  toggleSortAlphbetically() {
    this.isAscending = !this.isAscending;
    this.sortAlphabetically.emit(this.isAscending);
  }
}
