import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  error_messages ={
    'email':[
      { type: 'required', message: 'Email is required.' },
    ],
    'password':[
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must contain minimum 3 characters' },
    ],
  }

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
       ]],
      password: ['', [
        Validators.required,
        Validators.minLength(3)
       ]]
   });
  }

}
