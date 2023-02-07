import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products/products.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  products:any[] = [];
  productsData:any[] = [];
  selectedPage =1;
  // page:number=1

constructor(private productService:ProductsService){}
productPerPage:number=5;
  ngOnInit(): void {
    let pageIndex = (this.selectedPage -1) * this.productPerPage;
    this.productsData = this.products.slice(pageIndex,this.productPerPage)
    this._getAllProducts()
  }

  private _getAllProducts(){
    this.productService.getProducts().subscribe((res:any)=>{
      this.products = res.products;
      this.slicedProducts()
       // this.dttrigger.next(null);
      // console.log(this.products)
    })
  }

  changePageSize(event:Event){
     const newSize = (event.target as HTMLInputElement).value
     this.productPerPage = Number(newSize);
     this.changePage(1);
  }

  get  pageNumbers():number[]{
    return Array(Math.ceil(this.products.length / this.productPerPage))
    .fill(0).map((x,i)=>i+1)
  }

 changePage(page:any){
   this.selectedPage = page;
   this.slicedProducts();
 }

 slicedProducts(){
  let pageIndex = (this.selectedPage -1) * this.productPerPage;
  let endIndes = (this.selectedPage -1) * this.productPerPage + this.productPerPage
  this.productsData = [];
  this.productsData = this.products.slice(pageIndex,endIndes)
 }

//  selectPre(page:any){
//   let pageIndex = (this.selectedPage -1) * this.productPerPage;
//  }

//  selectNext(page:any){
//   let endIndes = (this.selectedPage -1) * this.productPerPage + this.productPerPage
//  }


}
