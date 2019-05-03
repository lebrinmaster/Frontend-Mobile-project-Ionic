import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  error_messages ={
    'email':[
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Please, enter correct email.' },
    ],
    'username': [
      {type: 'required', message: 'Username is required.'},
      { type: 'minlength', message: 'Username must contain minimum 3 characters.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must contain minimum 5 characters.' },
    ],
    'rpassword': [
      { type: 'required', message: 'Please, confirm your password!' },
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    public storage: Storage, 
    public authService: AuthService, 
    private router: Router
  ) { }

  ionViewWillEnter(){
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
       ]],
      'username': ['', [
        Validators.required,
        Validators.minLength(3)
       ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(5)
       ]],
      'rpassword': ['', [
        Validators.required
       ]]
   });
  }
  login(email, password){
    console.log(`Ваш имейл: ${email}`);
    console.log(`Ваш пароль: ${password}`);
    this.authService.login(email, password).pipe(
      catchError((err) => {
        if (err.status === 404) {
          console.log("Please Sign up first");
          return Observable.throw('123');
        }
      })
    ).subscribe((data: any) => {
      console.log(email, password);
      console.log(data.token);
      this.router.navigate(['']);
      this.storage.set('token', data.token); 
    })
  }
  register(email, username, password) {
    console.log(email, password);
    console.log(username);
    console.log(password);
    this.authService.register(email, username, password).pipe(
      catchError((err) => {
        if (err.status === 400) {
          console.log("User already exist!");
          return Observable.throw('123');
        }
      })
    ).subscribe(data => {
        console.log(data);
      
    })
    this.router.navigate(['/login']);
  }
}
