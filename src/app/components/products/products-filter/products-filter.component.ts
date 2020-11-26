import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductsFilter, ProductsFilterPriceRange } from '../../../models/filter.model';
import { Subject, Subscription } from 'rxjs';
import { cloneDeep, findIndex, isEqual } from 'lodash';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilterComponent implements OnInit, OnDestroy {
  @Input()
  filter: ProductsFilter;

  @Input()
  filterChanged: Subject<Partial<ProductsFilter>>;

  availableCategories: string [] = [
    'TV',
    'phone',
    'video games',
    'appliances',
  ];

  availablePriceRanges: ProductsFilterPriceRange [] = [
    { from: 0, to: 200 },
    { from: 200, to: 500 },
    { from: 500, to: 1000 },
    { from: 1000, to: 5000 },
  ];

  searchChanged: Subject<string> = new Subject();

  private sub: Subscription;

  ngOnInit(): void {
    this.sub = this.searchChanged
      .pipe(debounceTime(500))
      .subscribe((search) => {
        this.filterChanged.next({ search });
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isPriceRangeChecked(range: ProductsFilterPriceRange): boolean {
    return this.filter.priceRanges.some((r) => isEqual(r, range));
  }

  togglePriceRange(event: MouseEvent, range: ProductsFilterPriceRange): void {
    event.preventDefault();
    const priceRanges = cloneDeep(this.filter.priceRanges);
    const index = findIndex(this.filter.priceRanges, (r) => isEqual(r, range));

    if (index === -1) {
      this.filterChanged.next({
        priceRanges: [...priceRanges, range],
      });
    } else {
      priceRanges.splice(index, 1);
      this.filterChanged.next({ priceRanges });
    }
  }
}
