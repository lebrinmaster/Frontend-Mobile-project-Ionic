import { Component } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { HttpClient } from '@angular/common/http';

import { formatDate } from '@angular/common';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any = [];
  date: any;
  token: String;

  constructor(public httpClient: HttpClient,
    private postService: PostService,
    public actionSheetController: ActionSheetController, 
    public storage: Storage,
    public plt: Platform){
  }

  ionViewWillEnter() {

    this.date = formatDate(new Date(), 'MMMM dd, yyyy, H:mm', 'en');

    this.postService.getPosts()
      .then(data => {
        this.data = data;
        console.log(this.data); 
      })
      .catch(err => {
        return Promise.reject(err);
      });

    }


  deletePost(i, _id){
    console.log(_id);
    console.log(i);
    if (confirm("Are you sure?") == true){
      this.postService.deletePost(`http://localhost:3000/posts/delete/${_id}`,_id)
      .then(
        (data:any) => {
          console.log(data);
        }
      ).catch(err => {
        return Promise.reject(err);
      })
      console.log("Массив до удаления");
      console.log(this.data);
      this.data.splice(i,1);
      console.log("Массив после удаления");
      console.log(this.data);
    }
  }

  async socialActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Files',
      buttons: [{
        text: 'VKontakte',
        //role: 'destructive',
        icon: 'logo-vk',
        handler: () => {
          console.log('VK clicked');
        }
      }, {
        text: 'Facebook',
        icon: 'logo-facebook',
        handler: () => {
          console.log('Facebook clicked');
        }
      }, {
        text: 'Instagram',
        icon: 'logo-instagram',
        handler: () => {
          console.log('Instagram clicked');
        }
      }, {
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Twitter clicked');
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
