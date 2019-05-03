import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../Services/post.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  data: any = [];
  id: any = "";

  constructor(public postService: PostService, public httpClient: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(data => {
      this.id = data.id;
    })
   }

  ngOnInit() {
    this.postService.getPost(`http://localhost:3000/posts/jwt/${this.id}`)
    .then(data => {
      console.log(data);
      this.data = data;
      console.log(this.data);
    return console.log(Promise.resolve(data))
  })
  .catch(err => {
    return Promise.reject(err);
  })
  }
}
