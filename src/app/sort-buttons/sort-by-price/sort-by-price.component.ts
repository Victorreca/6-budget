import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-by-price',
  imports: [],
  templateUrl: './sort-by-price.component.html',
  styleUrl: './sort-by-price.component.scss',
})
export class SortByPriceComponent {
  @Output() sortByPrice = new EventEmitter<boolean>();
  @Input() isActive: boolean = false;

  isAscending = true;

  toggleSortByPrice() {
    this.isAscending = !this.isAscending;
    this.sortByPrice.emit(this.isAscending);
  }
}
