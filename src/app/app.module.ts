import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import * as fromShop from './store/shop.reducer';
import { ToastrModule } from 'ngx-toastr';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductInfoModalComponent } from './components/products/product-info-modal/product-info-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    CartComponent,
    ProductsFilterComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductInfoModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      shop: fromShop.reducer,
    }),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
