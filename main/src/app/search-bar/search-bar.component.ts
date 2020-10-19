import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SearchItemComponent } from './search-item/search-item.component';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

  suggestedSearchResult = [
    'Caroline Hodges',
    'Delores Rivas',
    'Darlene Franklin',
    'Alfreda Love',
    'Marcy Ratliff',
  ];
  recentlySearched = [
    'Alfreda Love',
    'Marcy Ratliff',
  ];
  discoverSearchResult = [
    'Morton Kerr',
    'Autumn Tillman',
    'Diane Bennett',
    'June Eaton'
  ];

  @ViewChildren(SearchItemComponent) searchItemElems: QueryList<SearchItemComponent>;
  @ViewChild('searchInput') public searchInputElem: ElementRef<HTMLElement>;

  private keyManager: ActiveDescendantKeyManager<SearchItemComponent>;

  isInputFocused: boolean;
  userTypedSomething: boolean;

  searchCtrl: FormControl = new FormControl();

  constructor(
    private _eRef: ElementRef,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.searchCtrl.valueChanges.subscribe(val => {

      if (!val) {
        this.userTypedSomething = false;
        // clear relevant search words
        // this.suggestedSearchResult = []
        return;
      }

      // get relevant search words
      // this.suggestedSearchResult =
    });
  }

  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.searchItemElems).withWrap();
    this.keyManager.change.subscribe(v => {
      if (this.keyManager?.activeItem?.searchItem) {
        this.searchCtrl.setValue(this.keyManager.activeItem.searchItem, { emitEvent: false });
      }
    });

    // Listen To Query Params and Update Search
    this._activateRoute.queryParams.subscribe(queryparams => {
      if (this._router.url.startsWith('/search') && queryparams?.q) {
        this.userTypedSomething = true;
        this.searchCtrl.setValue(queryparams?.q);
      }
    });
  }

  search(val?: string): void {
    if (val) {
      this.searchCtrl.setValue(val);
    }
    // Navigate to Search
    this._router.navigate(['search'], { queryParams: { q: this.searchCtrl.value } });
    this.keyManager.setActiveItem(-1);
    this.isInputFocused = false;
    this.searchInputElem.nativeElement.blur();
  }


  onKeydown(event): void {
    // User typed something
    this.keyManager.onKeydown(event);
    if (event.key.length === 1) {
      this.userTypedSomething = true;
      // defocusing as user typed
      this.keyManager.setActiveItem(-1);
    }
  }

  // Show Search
  onSearchFocus(): void {
    this.isInputFocused = true;
  }

  @HostListener('document:click', ['$event'])
  onSearchFocusOut(event): void {
    if (!this._eRef.nativeElement.contains(event.target)) {
      this.isInputFocused = false;
    }
  }


}
