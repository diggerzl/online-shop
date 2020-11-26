import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/cart.model';
import { Observable } from 'rxjs';
import { AppState, selectCart } from '../../store';
import { addOneToCart, removeOneFromCart } from '../../store/shop.actions';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cart$: Observable<CartItem []>;

  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(selectCart);
  }

  addOneItem(product: Product): void {
    this.store.dispatch(addOneToCart({ product }));
  }

  removeOneItem(product: Product): void {
    this.store.dispatch(removeOneFromCart({ product }));
  }
}
