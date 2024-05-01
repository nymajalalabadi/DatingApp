import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MemberDTO } from '../DTOs/member/MemberDTO';
import { map } from 'rxjs';
import { PaginationResult } from '../DTOs/pagination';
import { UserParams } from '../DTOs/userParams';


@Injectable({
  providedIn: 'root'
})


export class MemberService 
{

  baseUrl : string = "http://localhost:5250/api/";
  
  paginationResult: PaginationResult<MemberDTO[]> = new PaginationResult<MemberDTO[]>();


  constructor(private httpClient:HttpClient) { }

  getMembers(userParams: UserParams) 
  {

    let params = this.getPaginationHeader(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);

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

  private getPaginationHeader(pageNumber: number, pageSize: number) 
  {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
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
