import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,ReplaySubject } from 'rxjs';
import { UserDTO } from '../DTOs/UserDTO';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl : string = "http://localhost:5250/api/";

  private currentUserSource = new ReplaySubject<UserDTO>();

  currentUser = this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient) { }

  register(model : any)
  {
    return this.httpClient.post(`${this.baseUrl}account/register`, model).pipe(map((result : any) => {

      if(result.isSuccess && result.data != undefined)
      {
        this.currentUserSource.next(result.data);
        localStorage.setItem('user',JSON.stringify(result.data));
      }
      
      return result;
    }))
  }

  login(model : any)
  {
    return this.httpClient.post(`${this.baseUrl}account/login`, model).pipe(map((response) =>
    {

      const user : UserDTO = <UserDTO>response;
      
      if(user)
      {
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
      }

    }))
  }
  

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next({} as UserDTO);
  }

  setCurrentUser(user:UserDTO)
  {
    this.currentUserSource.next(user);
  }

}
