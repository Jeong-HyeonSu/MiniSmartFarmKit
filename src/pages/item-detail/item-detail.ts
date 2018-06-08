import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  itemName: any;
  item : any;
  serialNumber : any;
  userRef : any;
  numberOfPlants : any;
  plantKey : any;
  date = new Date();

  plantFlag = false;

  constructor(public navCtrl: NavController, navParams: NavParams, public afDB : AngularFireDatabase) {
    this.itemName = navParams.data.item;
    this.serialNumber = navParams.data.serialNumber;

    this.userRef = "userFarm/" + this.serialNumber;
    console.log(this.itemName);
    console.log(this.userRef);

    this.afDB.list('Plants', ref => ref.orderByChild('Name').equalTo(this.itemName)).valueChanges().subscribe(Items => {
      this.item = Items;
      console.log(this.item)
    });

    for(var i=0; i<5; i++) {
      this.afDB.object('Plants/' + i).snapshotChanges().take(1).subscribe((item) => {
        if(item.payload.val().Name == this.itemName) this.plantKey = item.payload.val().plantKey;
      })
    }
    

    this.afDB.object(this.userRef).snapshotChanges().take(1).subscribe((item2) => {
      this.numberOfPlants = item2.payload.val().numberOfPlants;
    })

    // 해당 식물이 내 키에 있는지 확인해야 한다. 그걸 deltePlant 함수에 넘겨줘야해


  }

  setPlant() {
    // TODO : 누르면 DB의 numberOfPlants ++ 시킨다.
    this.afDB.list("/userFarm").update(this.serialNumber, {numberOfPlants : this.numberOfPlants + 1});

    // Plants의 자식노드에 해당 식물 plantKey값 넣어서 만들어줘야해
    console.log(this.plantKey);
    this.afDB.list(this.userRef + "/Plants/").update(this.plantKey, {date : this.date});

  }

  deletePlant() {
    // TODO : 만약 해당 식물이 내 plant에 속해있으면 지우는 버튼을 보여준다.
    this.afDB.list(this.userRef + "/Plants/").remove(this.plantKey);
    this.afDB.list("/userFarm").update(this.serialNumber, {numberOfPlants : this.numberOfPlants - 1});

    
  }

}
