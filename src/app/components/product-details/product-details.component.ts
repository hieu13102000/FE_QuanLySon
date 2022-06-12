import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: 'Bạn có muốn lưu thay đổi ?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: `Huỷ`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.productService.update(this.currentProduct._id, this.currentProduct)
        .subscribe(
          response => {
            console.log(response);
    
            this.router.navigate(['/productList']);
          },
          error => {
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  
  deleteProduct(): void {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng tôi chắc!',
      cancelButtonText:'Huỷ'

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Xoá thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.productService.delete(this.currentProduct._id)
        .subscribe(
          response => {
            this.router.navigate(['/productList']);
          },
          error => {
            console.log(error);
          });
      }
    })
  }
}
