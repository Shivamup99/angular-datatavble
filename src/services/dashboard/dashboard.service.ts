import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  _getAllEmployee(){
    return this.http.get('http://localhost:3000/posts').pipe(map((res:any)=>{
      return res;
    }))
  }

  _postEmployee(data:any){
   return this.http.post('http://localhost:3000/posts',data).pipe(map((res:any)=>{
      return res;
    }))
  }

  _putEmployee(data:any,id:number){
    return this.http.put(`http://localhost:3000/posts/${id}`,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  _deleteEmployee(id:number){
    return this.http.delete('http://localhost:3000/posts/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
