import { Highlightable } from '@angular/cdk/a11y';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements Highlightable {

  @Input() searchItem: string;

  private _isActive = false;

  get isActive(): boolean {
    return this._isActive;
  }

  setActiveStyles(): void {
    this._isActive = true;
  }
  setInactiveStyles(): void {
    this._isActive = false;
  }

}
