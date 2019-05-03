import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: any = [];
  revPosts: any = [];
  token: String = "";
  headers: Object = {
    'Content-type': 'application/json',
    'x-auth': this.token
  }

  constructor(private httpClient: HttpClient, public storage: Storage) { }
  
  ngOnInit() {
    this.storage.get('token').then(token => {
      this.token = token;
      console.log(this.token);
      console.log(this.headers)
    })
  }
 
  async getPost(url): Promise<any> {
    let headers = {
      
      'Content-type': 'application/json',
      'x-auth': await this.storage.get('token')
    }
    console.log(headers);
    return this.httpClient.get(url, {headers})
    .toPromise()
    .then(data => {
      console.log(data);
    return Promise.resolve(data)
  })
  .catch(err => {
    return Promise.reject(err);
  })
    
  }

  async getPosts(): Promise<any> {
    let headers = {
      'Content-type': 'application/json',
      'x-auth': await this.storage.get('token')
    }
    console.log(headers);
    return this.httpClient.get(`http://localhost:3000/posts/jwt`, {headers} )
    .toPromise()
      .then(res=> {
        console.log(res);
        console.log(headers);
        let data = res.slice().reverse()
        console.log(data);
      return Promise.resolve(data)
    })
    .catch(err => {
      return Promise.reject(err);
    })
  }

  async deletePost(url, _id:any): Promise<any> {
    let headers = {
      'Content-type': 'application/json',
      'x-auth': await this.storage.get('token')
    }
    console.log(_id);
    console.log(headers);
    return this.httpClient.delete(url, {headers})
    .toPromise()
    .then(data =>{
      console.log(data);
    })
  }

}




