import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentProduct?: Product;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 6;
  pageSizes = [6, 3, 9];
  p: any;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`name`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveProducts(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.productService.getAll()
    .subscribe((products: any) =>{
      this.products = products
    },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProducts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProducts();
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = undefined;
    this.currentIndex = -1;
  }

  setActiveTutorial(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }
  Search() {
    if(this.name ==""){
      this.ngOnInit();
    }else{
      this.products = this.products.filter(res =>{
        return res.name?.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }
key ='_id'
reverse: boolean =false;
sort(key: string){
  this.key = key;
  this.reverse = !this.reverse;
}
}
