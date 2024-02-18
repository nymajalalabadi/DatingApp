import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl : string = "http://localhost:5250/api/";

  constructor(private http : HttpClient) { }

  login(model : any)
  {
    return this.http.post(`${this.baseUrl}Account/login`, model);
  }
  
}
