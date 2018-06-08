import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {
  information: any[];

 
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private afDB: AngularFireDatabase) {

    this.afDB.list('/NOTICE', ref => ref.orderByChild('name')).valueChanges().subscribe(Items => {
      this.information = Items;

    });

  }
 
  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
}
