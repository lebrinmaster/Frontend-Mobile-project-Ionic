import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../Services/post.service';
import { ActionSheetController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  posts: any = []; //array with posts. Soon i will push here posts.
  tags: any = []; //array with tags
  files: any = []; // array of objects with files
  icons: any = []; //delete soon
  token: String;
  date: any; //variable with date
  object: Object = {}; //object that will be sent to server


  constructor(
    public httpClient: HttpClient, 
    private postService: PostService, 
    public actionSheetController: ActionSheetController,
    public storage: Storage) { }

  ngOnInit() {
    this.storage.get("token").then(token => {
      this.token = token;

    this.postService.getPosts().then(
      (posts:any) => {
          this.posts = posts.slice().reverse();
          console.log(this.posts);
        });
    })
  }
  
  addPost(title, post) {
    let object = {
      title: title,
      text: post,
      tags: this.tags,
      files: this.files,
      date: this.date = formatDate(new Date(), 'MMMM dd, yyyy, H:mm', 'en')
    }
    let headers = {
      'Content-Type': 'application/json',
      'x-auth': this.token
    }
    console.log(headers);

    console.log(object);
    this.httpClient.post('http://localhost:3000/posts/create-jwt', object, {headers})
    .subscribe(
      (data:any) => {
          console.log(data);
        });

        // Frontend implementation

        this.postService.posts.push(object);
        this.postService.revPosts();
        console.log(this.postService.revPosts());
  }

  addTag(tag){
    if(!!tag){
      this.tags.push(tag);
      console.log(this.tags);
    } else{
      alert("Something went wrong")
    }
  }

  deleteTag(i){
    this.tags.splice(i,1);
  }
  
  deleteFile(i){
    this.files.splice(i,1);
    console.log(this.files);
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Files',
      buttons: [{
        text: 'Image',
        icon: 'images',
        handler: () => {
          this.files.push(
            {
              icon: "images",
              title: "Image",
              url: "http://google.com"
            });
          console.log('Image clicked');
          console.log(this.files);
        }
      }, {
        text: 'Video',
        icon: 'videocam',
        handler: () => {
          this.files.push(
            {
              icon: "videocam",
              title: "Video",
              url: "http://google.com"
            });
          console.log('Video clicked');
          console.log(this.files);
        }
      }, {
        text: 'Audio',
        icon: 'megaphone',
        handler: () => {
          this.files.push(
            {
              icon: "megaphone",
              title: "Audio",
              url: "http://google.com"
            });
          console.log('Audio clicked');
          console.log(this.files);
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }



}

