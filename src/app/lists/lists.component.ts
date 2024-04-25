import { Component, OnInit } from '@angular/core';
import { MemberDTO } from '../DTOs/member/MemberDTO';
import { MemberService } from '../services/member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '../members/member-card/member-card.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, FormsModule,MemberCardComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
  providers: [MemberService]
})

export class ListsComponent implements  OnInit {
  
  members : Partial<MemberDTO[]>;
  predicate = 'liked';

  constructor(private memberService:MemberService){

  }

  ngOnInit(): void 
  {
    this.loadLikes(this.predicate);
  }

  loadLikes(pre:string) 
  {
    this.predicate=pre;

    this.memberService.getlikes(this.predicate).subscribe(response => {
      this.members = response;
    })
  }

}
