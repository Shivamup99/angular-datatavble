import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseApiUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get<any>(this.baseApiUrl)
  }
}
