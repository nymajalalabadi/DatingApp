import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,ReplaySubject } from 'rxjs';
import { MemberDTO } from '../DTOs/member/MemberDTO';


const httpOptions = {
  headers : new HttpHeaders
  ({
      Authorization : 'Beaber'+JSON.parse(localStorage.getItem('user')|| '').token
  })
}

@Injectable({
  providedIn: 'root'
})


export class MemberService 
{

  baseUrl : string = "http://localhost:5250/api/";

  constructor(private httpClient:HttpClient) { }

  getMembers()
  {
    return this.httpClient.get<MemberDTO[]>(this.baseUrl+'users', httpOptions)
  }

  getMember(userName:string)
  {
    return this.httpClient.get<MemberDTO>(this.baseUrl+'user/'+userName, httpOptions)
  }

}
