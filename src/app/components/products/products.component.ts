import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { addOneToCart, setProductsFilter } from '../../store/shop.actions';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProductInfoModalComponent } from './product-info-modal/product-info-modal.component';
import { take } from 'rxjs/operators';
import { ProductsFilter } from '../../models/filter.model';
import { AppState, selectFilter } from '../../store';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  filter$: Observable<ProductsFilter>;

  filterChanged: Subject<Partial<ProductsFilter>> = new Subject();

  products: Product [] = [];

  total: number;
  // in requirements I saw 10 by default, but it doesn't fit in grid with 3 items in a row
  limit = 12;
  page = 1;

  private sub: Subscription = new Subscription();

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>,
    private toastrService: ToastrService,
    private modalService: BsModalService,
  ) {
    this.filter$ = store.select(selectFilter);
  }

  ngOnInit(): void {
    const sub1 = this.filterChanged
      .subscribe((filter: Partial<ProductsFilter>) => {
        this.store.dispatch(setProductsFilter({ filter }));
        console.log(filter);
      });
    this.sub.add(sub1);

    const sub2 = this.filter$.subscribe((filter) => {
      this.products = [];
      this.page = 1;
      this.loadProducts(filter);
    });
    this.sub.add(sub2);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(addOneToCart({ product }));
    this.toastrService.info('Product added to cart');
  }

  openProductInfo(product: Product): void {
    const initialState = {
      product,
    };
    const bsModalRef = this.modalService.show(ProductInfoModalComponent, {
      initialState,
      class: 'modal-lg',
    });
    const component = bsModalRef.content as ProductInfoModalComponent;

    component.onConfirm
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) {
          this.addProductToCart(product);
        }
      });
  }

  loadMore(): void {
    this.page++;
    this.filter$.pipe(take(1)).subscribe((filter) => {
      this.loadProducts(filter);
    });
  }

  private loadProducts(filter?: ProductsFilter): void {
    const filterQuery = filter ? this.getFilterQuery(filter) : null;
    const hasRangeFilter = filter?.priceRanges?.length;

    // looks like json-server doesn't support multiple price filters
    // so if range filter exist manual filtering is required
    // should be ok with real backend

    const page = hasRangeFilter ? 1 : this.page;
    const limit = hasRangeFilter ? 100 : this.limit;

    this.productsService.getProducts(page, limit, filterQuery).subscribe((response) => {
      this.total = response.total;
      let products = [...this.products, ...response.data];
      if (hasRangeFilter) {
        products = response.data.filter((product) => {
          return filter.priceRanges.some((range) => {
            return product.price >= range.from && product.price < range.to;
          });
        });
        this.total = products.length;
        products = products.slice(0, this.page * this.limit);
      }

      this.products = products;
    });
  }

  private getFilterQuery(filter: ProductsFilter): string {
    let filterQuery = '';

    if (filter.category) {
      filterQuery += `&category=${filter.category}`;
    }

    if (filter.search) {
      filterQuery += `&q=${filter.search}`;
    }

    return filterQuery;
  }
}
