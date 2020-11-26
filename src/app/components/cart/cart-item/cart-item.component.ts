import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/cart.model';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input()
  cartItem: CartItem;

  @Output()
  plusClicked: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  @Output()
  minusClicked: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  get product(): Product {
    return this.cartItem?.product;
  }
}
