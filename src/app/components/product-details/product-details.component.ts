import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct: Product = {
    name: '',
    price: 0,
    old_price: 0,
    discount: '',
    gender: '',
    color: '',
    made_in: '',
    brand: '',
    img: '',
  };
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.params['_id']);
  }

  getProduct(_id: any): void {
    this.productService.seachProduct(_id)
      .subscribe(
        data => {
          this.currentProduct = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updateProduct(): void {
    this.productService.update(this.currentProduct._id, this.currentProduct)
      .subscribe(
        response => {
          console.log(response);
          window.alert('Đã cập nhật thành công!');
          this.router.navigate(['/productList']);
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct._id)
      .subscribe(
        response => {
          console.log(response);
          window.alert('Đã xoá thành công!');
          this.router.navigate(['/productList']);
        },
        error => {
          console.log(error);
        });
  }
}
