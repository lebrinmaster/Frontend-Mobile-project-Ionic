import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
//import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any = "";

  constructor(
    private httpClient: HttpClient, 
    private router: Router, 
    public storage: Storage,
    /*public http: HTTP*/) { }

  ngOnInit() {
    this.token = this.storage.get('token').then(token => {
    console.log(token)
    this.token = token;
    console.log(this.token);
    })
  }

  login(email: string, password: string) {
    return this.httpClient.post('http://localhost:3000/user/login', {email, password})
  }

  register(email: string, username: string, password: string) {
    return this.httpClient.post('http://localhost:3000/user/register', {email, username, password})
  }

  logout() {
    this.storage.remove('token');
    this.router.navigate(['login']);
  }
  
  public get logIn(): boolean {
    return (this.storage.get('token') !== null);
  }
}
