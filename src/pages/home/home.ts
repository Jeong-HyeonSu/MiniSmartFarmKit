import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  flag = true;
  temperatureFlag = true;
  humidityFlag = true;
  iluuminanceFlag = true;

  contents : any;
  serialNumber : any;
  userRef : any;

  temperature : any;
  temperatureState : any;
  humidity : any;
  humidityState : any;
  illuminance : any;
  illuminanceState : any;


  constructor(public navCtrl: NavController, public afDB : AngularFireDatabase, public navParams : NavParams) {

    this.serialNumber = navParams.data;
    console.log("Home serial : ", this.serialNumber)

    this.userRef = "userFarm/" + this.serialNumber;

    this.afDB.object(this.userRef + "/humidity").snapshotChanges().subscribe(item => {
      this.humidity = item.payload.val().sensorvalue;
      this.humidityState = item.payload.val().status;
      if(item.payload.val().status == 'bad') {
        this.flag = false;
        this.humidityFlag = false;
      }
    })

    this.afDB.object(this.userRef + "/illuminance").snapshotChanges().subscribe(item => {
      this.illuminance = item.payload.val().sensorvalue;
      this.illuminanceState = item.payload.val().status;
      if(item.payload.val().status == 'bad') {
        this.flag = false;
        this.iluuminanceFlag = false;
      }
    })

    this.afDB.object(this.userRef + "/temperature").snapshotChanges().subscribe(item => {
      this.temperature = item.payload.val().sensorvalue.toFixed(2);
      this.temperatureState = item.payload.val().status;
      if(item.payload.val().status == 'bad') {
        this.flag = false
        this.temperatureFlag = false;
      }
    })
  }

  openTemperaturePage(){
    this.navCtrl.push('HumidityPage', { segment : 'color-fill', serialNumber : this.serialNumber});
  }

  openHumidityPage(){
    this.navCtrl.push('HumidityPage', {segment : 'sunny', serialNumber : this.serialNumber});
  }

  openIlluminationPage(){
    this.navCtrl.push('HumidityPage', {segment : 'thermometer', serialNumber : this.serialNumber});
  }

}
