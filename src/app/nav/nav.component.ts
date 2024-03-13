import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { error } from 'console';
import { Observable } from 'rxjs';
import { UserDTO } from '../DTOs/UserDTO';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import LoginDTO from '../DTOs/account/LoginDTO';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [AccountService, ToastrService]
})

export class NavComponent implements OnInit {
  
  model: LoginDTO  = new LoginDTO();
  currentUser$: Observable<UserDTO> | undefined;

  constructor(public accountService: AccountService,private router:Router) {
  }

  ngOnInit(): void {
    this.currentUser$=this.accountService.currentUser;
  }

  login() {
    this.accountService.login(this.model).subscribe(data => {
      this.router.navigateByUrl('/members');
      console.log(data);
    }, error => {
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
