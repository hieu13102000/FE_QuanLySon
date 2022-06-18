import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
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
  product: Product = {
    name: '',
    discount: '',
    gender: '',
    color: '',
    made_in: '',
    brand: '',
    img: '',
  };

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        price: ['', [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]],
        old_price: ['', [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]],
        color: ['', Validators.required],
        made_in: ['', Validators.required],
        brand: ['', Validators.required],
        img: ['https://drive.google.com/file/d/1Tv9NL7Jf930WkrMERn05uXYPg4U2yEUo/view?usp=sharing', Validators.required],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
  //  Điều kiện check nếu tất cả giá trị hợp lệ thì thêm sp
    if (this.form.invalid) {
      return;
    }
/// hàm thêm
      this.productService.create(this.form.value)
        .subscribe(
          response => {
            this.submitted = true;
            // thông báo
            Swal.fire({
              icon: 'success',
              title: 'Thêm sản phẩm thành công',
              showConfirmButton: false,
              timer: 1500
            })
            // this.newProduct();
            this.router.navigate(['/productList']);
          },
          error => {
            alert("Thêm sản phẩm thất bại")
          });
          console.log(JSON.stringify("kết thức"));
  }
}
