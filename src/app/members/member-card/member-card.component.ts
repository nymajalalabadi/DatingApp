import { Component, Input, OnInit, input } from '@angular/core';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit 
{
  ngOnInit(): void 
  {
    
  }

  @Input() member : MemberDTO;
}
