import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the HumidityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-humidity',
  templateUrl: 'humidity.html',
})
export class HumidityPage {

  icons : any;
  serialNumber : any;
  
  userRef : any;
  
  humidity : any;
  humidityState : any;
  illuminance : any;
  illuminanceState : any;
  temperature : any;
  temperatureState : any

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public afDB : AngularFireDatabase) {

    if(navParams.get('segment')) {
      this.icons = navParams.get('segment');
      this.serialNumber = navParams.data.serialNumber;
      console.log(this.serialNumber);
    }
    else {
      this.icons = "color-fill";
      this.serialNumber = navParams.data;
      console.log(this.serialNumber)
      
    }

    this.userRef = "userFarm/" + this.serialNumber;

    this.afDB.object(this.userRef + "/humidity").snapshotChanges().subscribe(item => {
      this.humidity = item.payload.val().sensorvalue;
      this.humidityState = item.payload.val().status;
    })

    this.afDB.object(this.userRef + "/illuminance").snapshotChanges().subscribe(item => {
      this.illuminance = item.payload.val().sensorvalue;
      this.illuminanceState = item.payload.val().status;
    })

    this.afDB.object(this.userRef + "/temperature").snapshotChanges().subscribe(item => {
      this.temperature = item.payload.val().sensorvalue.toFixed(2);
      this.temperatureState = item.payload.val().status;
    })

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HumidityPage');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'No engines',
      subTitle: 'The module is not attached.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
