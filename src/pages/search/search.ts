import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  plantsRef : any;
  serialNumber : any;
  userRef : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,
     public afDB : AngularFireDatabase, public alertCtrl: AlertController) { 

    this.plantsRef = "Plants";

    this.afDB.object(this.plantsRef).valueChanges().subscribe(item => {
      this.currentItems = item;
      console.log(item);
    })
  
    // get serialNumber
    if(this.navParams.get('serialNumber')) {
      this.serialNumber = this.navParams.get('serialNumber');

      this.userRef = "userFarm/" + this.serialNumber;

      this.afDB.object(this.userRef).snapshotChanges().take(1).subscribe((item) => {

        var trans = item.payload.val().numberOfPlants;

        if(trans == 0) {
          let alert = this.alertCtrl.create({
            title: 'No plants',
            subTitle: 'You have to set your own plants to start.',
            buttons: ['Dismiss']
          });
          alert.present();
        }

      })
      
    }
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.afDB.list(this.plantsRef, ref => ref.orderByChild('Name').startAt(val)).valueChanges().subscribe(Items => {
      this.currentItems = Items;

    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item,
      serialNumber : this.serialNumber
    });
  }

}
