import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
    public formBuilder: FormBuilder, 
    public storage: Storage, 
    public authService: AuthService, 
    private router: Router
  ) { }

  ionViewWillEnter(){
    this.authService.logout()
  }

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
  register(){
    this.router.navigate(['/register']);
  }
}
