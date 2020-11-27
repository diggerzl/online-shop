import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../../../models/product.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-info-modal',
  templateUrl: './product-info-modal.component.html',
  styleUrls: ['./product-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoModalComponent {
  product: Product;

  onConfirm: Subject<boolean> = new Subject();

  constructor(public bsModalRef: BsModalRef) {
  }

  confirm(): void {
    this.onConfirm.next(true);
    this.bsModalRef.hide();
  }
}
