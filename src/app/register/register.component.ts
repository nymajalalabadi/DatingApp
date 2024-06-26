import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AccountService]
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(private accountService:AccountService, private formBuilder: FormBuilder, private router: Router)
  {
  }

  ngOnInit(): void {
    this.initForm();
  }

  @Output() cancelRegister = new EventEmitter();

  register()
  {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    },error => {
      console.log(error);
    });
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.confirmPasswordValidator });
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return control?.value.password === control.value.confirmPassword ?
      null : { PasswordNoMatch: true };
  }

  cansel()
  {
    this.cancelRegister.emit(false);
  }

}
