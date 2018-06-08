import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {

  serialNumber : any;

  opts: any = {
    showBackdrop: true,
    enableBackdropDismiss: true,
    cssClass:'mini-modal'
  }

  constructor(public navCtrl: NavController, public modalCtrl:ModalController, public navParams : NavParams, public alertCtrl: AlertController) { 
    this.serialNumber = navParams.data;
    console.log("setting serial : ", this.serialNumber)
  }

  setPlant() {
   
      let searchPalntModal = this.modalCtrl.create('SearchPage', {serialNumber : this.serialNumber}, this.opts);
      searchPalntModal.present();
    
  }

  showNotice() {
    let noticeModal = this.modalCtrl.create('NoticePage', {}, this.opts);
      noticeModal.present();
  }

  customerService() {
    window.location.href = "mailto:wangting5@naver.com";
  }
  setEngines() {
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'It will be updated soon.',
      buttons: ['Dismiss']
    });
    alert.present();

  }
}
