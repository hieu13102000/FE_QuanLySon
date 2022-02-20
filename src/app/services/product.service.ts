import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ Product} from'../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  baseUrl = 'https://61455ce638339400175fc5b0.mockapi.io/product';
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe();
  }
  get(_id: any): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${_id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(_id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${_id}`, data);
  }

  delete(_id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${_id}`);
  }
  seachProduct(_id:number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${_id}`).pipe()
  }
}
