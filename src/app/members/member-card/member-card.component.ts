import { MemberService } from './../../services/member.service';
import { Component, Input, OnInit, input } from '@angular/core';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
  providers: [MemberService]
})
export class MemberCardComponent implements OnInit 
{
  @Input() member : MemberDTO;

  ngOnInit(): void 
  {
    
  }

  constructor(private memberService:MemberService){

  }

  AddLike(membere : MemberDTO){
    this.memberService.addLike(membere.userName).subscribe(()=>{
      console.log("کابری را لایک کردی");
    });
  };
}
