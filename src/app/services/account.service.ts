import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl : string = "http://localhost:5250/api/";

  constructor(private httpClient:HttpClient) { }

  login(model : any)
  {
    return this.httpClient.post(`${this.baseUrl}account/login`,model);
  }
  
  logout()
  {
    return this.httpClient.get(`${this.baseUrl}account/logout`);
  }
}
