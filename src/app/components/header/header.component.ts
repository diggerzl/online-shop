import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppState, selectItemsInCartCount } from '../../store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isHeaderVisible = false;

  itemsInCartCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.itemsInCartCount$ = this.store.select(selectItemsInCartCount);
  }
}
