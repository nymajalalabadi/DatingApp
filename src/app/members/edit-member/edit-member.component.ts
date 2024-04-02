import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { UserDTO } from '../../DTOs/UserDTO';
import { AccountService } from '../../services/account.service';
import { MemberService } from '../../services/member.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.css',
  providers: [AccountService, MemberService]
})

export class EditMemberComponent implements OnInit
{
  @ViewChild('editForm') editForm : NgForm

  member : MemberDTO;
  user : UserDTO;

  constructor(private accountService : AccountService, private memberService : MemberService)
  {
    this.accountService.currentUser.pipe(take(1)).subscribe(user =>
    {
      this.user = user;
    });
  }

  ngOnInit(): void 
  {
    this.LoadMember();
  }

  LoadMember()
  {
    this.memberService.getMember(this.user.userName).subscribe(member => 
    {
      this.member = member;
    });
  }

  updateMember()
  {

  }

}
