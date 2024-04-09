import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberDTO } from '../DTOs/member/MemberDTO';


@Injectable({
  providedIn: 'root'
})


export class MemberService 
{

  baseUrl : string = "http://localhost:5250/api/";

  constructor(private httpClient:HttpClient) { }

  getMembers()
  {
    return this.httpClient.get<MemberDTO[]>(this.baseUrl+'user')
  }

  getMember(userName:string)
  {
    return this.httpClient.get<MemberDTO>(this.baseUrl+'user/'+userName)
  }

  updateMember(member:MemberDTO)
  {
    return this.httpClient.put(this.baseUrl+'user', member);
  }

}
