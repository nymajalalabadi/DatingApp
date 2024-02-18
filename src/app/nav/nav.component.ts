import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

export class NavComponent {
  
  model: any = {};

  isLoggin : boolean = false;

  constructor(private accountService:AccountService){
  }

  login(){
    this.accountService.login(this.model).subscribe(data =>
    {
      console.log(data);
      this.isLoggin = true;
    },error=>{
      console.log(error);
    });
  }

  logout()
  {
    this.accountService.logout().subscribe(data => 
    {
      console.log(data);
      this.isLoggin = false;
    },error=>{
      console.log(error);
    });
  }

}
