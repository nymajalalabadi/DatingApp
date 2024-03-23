import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  providers: [MemberService]
})

export class MemberDetailComponent implements OnInit
{
  member : MemberDTO;

  constructor(private memberService : MemberService, private route : ActivatedRoute)
  {

  }

  ngOnInit(): void 
  {
    this.LoadMember()
  }

  LoadMember()
  {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
    })
  }

}
