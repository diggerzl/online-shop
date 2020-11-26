import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductsResponse } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(page: number, limit: number, filterQuery?: string): Observable<ProductsResponse> {
    let url = `/api/products?_page=${page}&_limit=${limit}`;

    if (filterQuery) {
      url += filterQuery;
    }

    return this.http
      .get<Product []>(url, { observe: 'response' })
      .pipe(
        map((response) => {
          return {
            total: parseInt(response.headers.get('x-total-count'), 10),
            data: response.body,
          };
        }),
      );
  }
}
