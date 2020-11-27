import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { AppState, selectCart } from '../../store';
import { addOneToCart, removeOneFromCart } from '../../store/shop.actions';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnDestroy {
  cart$: Observable<CartItem []>;

  total: number;

  private sub: Subscription;

  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(selectCart);

    this.sub = this.cart$.subscribe((cart: CartItem []) => {
      this.total = cart.reduce((total, item) => {
        return total + item.count * item.product.price;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addOneItem(product: Product): void {
    this.store.dispatch(addOneToCart({ product }));
  }

  removeOneItem(product: Product): void {
    this.store.dispatch(removeOneFromCart({ product }));
  }
}
