import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../Services/post.service';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  posts: any = []; //array with posts. Soon i will push here posts.
  tags: any = []; //array with tags
  files: any = []; // array of objects with files
  file: any = [];
  icons: any = []; //delete soon
  date: any; //variable with date
  object: Object = {}; //object that will be sent to server
  data: any = [];
  id: any = "";

  constructor(public route: ActivatedRoute, public postService: PostService, 
    public httpClient: HttpClient,
     public actionSheetController: ActionSheetController,
     public storage: Storage) {
    this.route.params.subscribe(info => {
    this.id = info.id;
    }) 
  }

  ngOnInit() {

    this.date = formatDate(new Date(), 'MMMM dd, yyyy, H:mm', 'en');

    this.postService.getPost(`http://localhost:3000/posts/jwt/${this.id}`)
    .then(data => {
      this.data = data;
    return Promise.resolve(data)
  })
  .catch(err => {
    return Promise.reject(err);
    })
    console.log(this.data)
    console.log(this.files);
  }

  async updatePost(title, post){
    let object = {
      title: title,
      text: post,
      tags: this.data.tags,
      files: this.data.files.map(f => {
        delete f._id;
        return f;
      }),
      date: this.date
    }
    let headers = {
        'Content-type': 'application/json',
        'x-auth': await this.storage.get('token')
    }
    console.log(object);

    this.httpClient.put(`http://localhost:3000/posts/update/${this.id}`, object, {headers})
    .toPromise()
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err)
    })
    console.log(object)
  }

  addTag(tag){
    if(!!tag){
      this.data.tags.push(tag);
      console.log(this.tags);
    } else{
      alert("Something went wrong")
    }
  }

  deleteTag(i){
    this.data.tags.splice(i,1);
  }

  deleteFile(i){
    this.data.files.splice(i,1);
    console.log(this.data.files);
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Files',
      buttons: [{
        text: 'Image',
        icon: 'images',
        handler: () => {
          this.data.files.push(
            {
              icon: "images",
              title: "Image",
              url: "http://google.com"
            });
          console.log('Image clicked');
          console.log(this.data.files);
        }
      }, {
        text: 'Video',
        icon: 'videocam',
        handler: () => {
          this.data.files.push(
            {
              icon: "videocam",
              title: "Video",
              url: "http://google.com"
            });
          console.log('Video clicked');
          console.log(this.data.files);
        }
      }, {
        text: 'Audio',
        icon: 'megaphone',
        handler: () => {
          this.data.files.push(
            {
              icon: "megaphone",
              title: "Audio",
              url: "http://google.com"
            });
          console.log('Audio clicked');
          console.log(this.data.files);
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
