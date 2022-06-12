import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {
    name: '',
    discount: '',
    gender: '',
    color: '',
    made_in: '',
    brand: '',
    img: '',
  };
  submitted = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }
  
  saveProduct(): void {
    const data = {
      name: this.product.name,
      price: this.product.price,
      old_price: this.product.old_price,
      discount: this.product.discount,
      gender: this.product.gender,
      color: this.product.color,
      made_in: this.product.made_in,
      brand: this.product.brand,
      img: this.product.img,
    };

    this.productService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          // thông báo
          Swal.fire({
            icon: 'success',
            title: 'Thêm sản phẩm thành công',
            showConfirmButton: false,
            timer: 1500
          })
          this.newProduct();
        },
        error => {
          console.log(error);
        });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      discount: '',
      gender: '',
      color: '',
      made_in: '',
      brand: '',
      img: '',
    };
  }

}
