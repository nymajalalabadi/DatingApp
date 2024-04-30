import { MemberCardComponent } from './../member-card/member-card.component';
import { Component, OnInit } from '@angular/core';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../DTOs/pagination';
import { PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MemberCardComponent,PaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
  providers: [MemberService]
})
export class MemberListComponent implements OnInit
{

  members: MemberDTO[] | undefined;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;


  constructor(private memberService : MemberService)
  {

  }

  ngOnInit(): void 
  {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChnaged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers();
  }


}
