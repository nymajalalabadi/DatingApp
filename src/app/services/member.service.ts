import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MemberDTO } from '../DTOs/member/MemberDTO';
import { map } from 'rxjs';
import { PaginationResult } from '../DTOs/pagination';


@Injectable({
  providedIn: 'root'
})


export class MemberService 
{

  baseUrl : string = "http://localhost:5250/api/";
  
  paginationResult: PaginationResult<MemberDTO[]> = new PaginationResult<MemberDTO[]>();


  constructor(private httpClient:HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number) {

    let params = new HttpParams();

    if (page !== null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.httpClient.get<MemberDTO[]>(this.baseUrl + 'user', { observe: 'response', params }).pipe(
      map(response => {
        this.paginationResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return this.paginationResult;
      })
    )
  }



  getMember(userName:string)
  {
    return this.httpClient.get<MemberDTO>(this.baseUrl+'user/'+userName)
  }

  updateMember(member:MemberDTO)
  {
    return this.httpClient.put(this.baseUrl+'user', member);
  }

  addLike(username: string) 
  {
    return this.httpClient.post(this.baseUrl + "like/" + username, {});
  }

  getlikes(predicate: string) 
  {
    return this.httpClient.get<Partial<MemberDTO[]>>(this.baseUrl + "like?predicate=" + predicate);
  }


}
