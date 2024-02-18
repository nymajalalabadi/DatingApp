import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { error } from 'console';

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

  isLogin : boolean = true;

  constructor(private accountService:AccountService)
  {

  }

  ngOnInit(): void 
  {
    this.getCurrentUser();
  }

  login(){
    this.accountService.login(this.model).subscribe(data =>
    {
      console.log(data);
      this.isLogin = true;
    },error=>{
      console.log(error);
    });
  }

  logout() {
    this.accountService.logout();
    this.isLogin=false;
  }

  getCurrentUser()
  {
    this.accountService.currentUser.subscribe((user) =>
    {
      this.isLogin=!!user;
    },error => 
    {
      console.log(error);
    })
  }

}
