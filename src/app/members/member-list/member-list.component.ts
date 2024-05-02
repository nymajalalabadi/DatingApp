import { AccountService } from './../../services/account.service';
import { UserDTO } from './../../DTOs/UserDTO';
import { MemberCardComponent } from './../member-card/member-card.component';
import { Component, OnInit } from '@angular/core';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../DTOs/pagination';
import { PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { UserParams } from '../../DTOs/UserParams';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MemberCardComponent,PaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
  providers: [MemberService, AccountService]
})
export class MemberListComponent implements OnInit
{

  members: MemberDTO[] | undefined;
  pagination: Pagination;
  userParams : UserParams;
  user : UserDTO;
  genderList = [{ value: 'male', display: 'مرد' }, { value: 'female', display: 'خانوم' }];

  constructor(private memberService : MemberService, private AccountService : AccountService)
  {
    this.AccountService.currentUser.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user)
    });
  }

  ngOnInit(): void 
  {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }


  pageChnaged(event: any) {
    this.userParams.pageSize = event.page;
    this.loadMembers();
  }
}
