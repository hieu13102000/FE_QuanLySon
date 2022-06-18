import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    old_price: new FormControl(''),
    color: new FormControl(''),
    made_in: new FormControl(''),
    brand: new FormControl(''),
    img: new FormControl(''),
});
submitted = false;
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.seachProduct(this.route.snapshot.params['_id'])
      .subscribe(
        data => {
          this.currentProduct = data;
          this.form = this.formBuilder.group(
            {
              name: [this.currentProduct.name, Validators.required],
              price: [this.currentProduct.price, [
                Validators.required,
                Validators.pattern(/^-?(0|[1-9]\d*)?$/)
              ]],
              old_price: [this.currentProduct.old_price, [
                Validators.required,
                Validators.pattern(/^-?(0|[1-9]\d*)?$/)
              ]],
              color: [this.currentProduct.color, Validators.required],
              made_in: [this.currentProduct.made_in, Validators.required],
              brand: [this.currentProduct.brand, Validators.required],
              img: [this.currentProduct.img, Validators.required],
            },
          );
        },
        error => {
          console.log(error);
        });
  
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  updateProduct(){
    this.submitted = true;
    //  Điều kiện check nếu tất cả giá trị hợp lệ thì thêm sp
      if (this.form.invalid) {
        return;
      }
      
    Swal.fire({
      title: 'Bạn có muốn lưu sự thay đổi?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      denyButtonText: `không lưu`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Đã lưu!', '', 'success')
        this.productService.update(this.currentProduct._id, this.form.value)
        .subscribe(
          response => {
            this.router.navigate(['/productList']);
          },
          error => {
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire('Lưu không thay đổi', '', 'info')
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
