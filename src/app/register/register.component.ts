import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AccountService]
})
export class RegisterComponent {

  model : any = {};

  constructor(private accountService:AccountService)
  {
  }

  @Output() cancelRegister = new EventEmitter();

  register()
  {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cansel();
    },error => {
      console.log(error);
    });
  }

  cansel()
  {
    this.cancelRegister.emit(false);
  }
}
