import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  @Input()
  product: Product;

  @Output()
  addToCartClicked: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  viewClicked: EventEmitter<Product> = new EventEmitter<Product>();

  handleItemClick(event: MouseEvent): void {
    event.stopPropagation();
    this.viewClicked.emit(this.product);
  }

  addToCart(event: MouseEvent): void {
    event.stopPropagation();
    this.addToCartClicked.emit(this.product);
  }
}
