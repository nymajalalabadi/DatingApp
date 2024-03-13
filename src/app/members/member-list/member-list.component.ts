import { MemberCardComponent } from './../member-card/member-card.component';
import { Component, OnInit } from '@angular/core';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
  providers: [MemberService]
})
export class MemberListComponent implements OnInit
{

  members : MemberDTO[] | undefined;

  constructor(private memberService : MemberService)
  {

  }

  ngOnInit(): void 
  {
    this.loadMembers();
  }

  loadMembers()
  {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

}
