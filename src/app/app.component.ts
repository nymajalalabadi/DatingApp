import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { UserDTO } from './DTOs/UserDTO';
import { json } from 'stream/consumers';
import { AccountService } from './services/account.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule, NavComponent, HomeComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AccountService]
})
export class AppComponent implements OnInit {

  users: any;
  title = 'DatingApp';


  constructor(private http: HttpClient, private accounService : AccountService) { }
  
  ngOnInit(): void 
  {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user : UserDTO = JSON.parse(localStorage.getItem('user') || "");
    this.accounService.setCurrentUser(user);
  }

  getUsers(){
    this.http.get("http://localhost:5250/api/user").subscribe(response=>{
      this.users=response;
    },error=>{
      console.log(error);
    });
  }
 
}
