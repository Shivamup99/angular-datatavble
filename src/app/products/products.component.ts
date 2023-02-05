import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any
  key:string = 'id'
  reverse:boolean = false
  dtoptions:DataTables.Settings={};
  dttrigger:Subject<any> = new Subject<any>()
  filterTerm!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private productService:ProductsService){}

  ngOnInit(): void {
    this.dtoptions={
      // pagingType:'simple_numbers',
      //searching:false,
      //paging:true,
     // lengthChange:true,
      // language:{
      //   searchPlaceholder:'search by title...'
      // }
    }
    this._getAllProducts()
  }

  private _getAllProducts(){
    this.productService.getProducts().subscribe((res:any)=>{
      this.products = res.products;
       // this.dttrigger.next(null);
      // console.log(this.products)
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this._getAllProducts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this._getAllProducts();
  }

  setPageSize() {
    this.page = 1;
  }

  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse
  }


}
