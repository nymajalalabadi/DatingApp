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
  styleUrl: './nav.component.css'
})

export class NavComponent {
  
  model : any = {};

  constructor(private accountService : AccountService) 
  {
    
  }

  login()
  {
    this.accountService.login(this.model).subscribe(data => 
      {console.log(data)},
      error => {
        console.log(error);
      }
      );
  }

}
