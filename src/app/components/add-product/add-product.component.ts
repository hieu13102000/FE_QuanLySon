import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
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
  // submitted = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;
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
        img: ['', Validators.required],
      },

    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if ((this.form.value.name && this.form.value.price && this.form.value.old_price &&
      this.form.value.color && this.form.value.made_in && this.form.value.brand !== "") &&
      isNaN(this.form.value.price) === false && isNaN(this.form.value.old_price) === false) {
      const data = {
        name: this.form.value.name,
        price: this.form.value.price,
        old_price: this.form.value.old_price,
        discount: "this.form.value.discount",
        gender: "this.form.value.gender",
        color: this.form.value.color,
        made_in: this.form.value.made_in,
        brand: this.form.value.brand,
        img: this.form.value.img,
      };

      this.productService.create(data)
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
            this.newProduct();
            this.router.navigate(['/productList']);
          },
          error => {
            alert("Thêm sản phẩm thất bại")
          });
    }

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
