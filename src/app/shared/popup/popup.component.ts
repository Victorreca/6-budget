import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [],
})
export class PopupComponent {
  isVisible = false;
  popUpId: 'pages' | 'languages' | null = null;

  openPopup(id: 'pages' | 'languages'): void {
    this.popUpId = id;
    this.isVisible = true;
  }
  closePopup(): void {
    this.isVisible = false;
  }
}
