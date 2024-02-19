import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { error } from 'console';
import { Observable } from 'rxjs';
import { UserDTO } from '../DTOs/UserDTO';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [AccountService]
})

export class NavComponent implements OnInit {
  
  model: any = {};

  constructor(public accountService:AccountService)
  {

  }

  ngOnInit(): void 
  {
  }

  login(){
    this.accountService.login(this.model).subscribe(data =>
    {
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

  logout() {
    this.accountService.logout();
  }

  

}
