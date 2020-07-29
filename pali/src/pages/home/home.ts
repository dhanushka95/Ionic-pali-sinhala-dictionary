import { Component } from '@angular/core';
import { NavController,AlertController,PopoverController } from 'ionic-angular';
import {InformationServiceProvider} from "../../providers/information-service/information-service";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {Settings} from "../../common/Settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Item:any[] = [];
  searchValue:string = '';
  isLoading = false;
  type = 1;
  tempItem:any[] = [];
  constructor(public navCtrl: NavController,public informationServiceProvider:InformationServiceProvider,public speechRecognition: SpeechRecognition,public alertController: AlertController,public popoverController: PopoverController
     ) {
  }
  search(){
    try {
      this.isLoading = true;
      this.informationServiceProvider.getInfo(this.searchValue,this.type).subscribe(
        (list: any) => {
          console.log(list);
           this.Item = list.data;
          this.tempItem = list.data;
          this.isLoading = false;
        });
    }catch (e) {
      console.log(e+"");
    }
  }
  onCancel(){

  }
  onSearchInput(event){
  console.log(event);
  }
  speechRecognitionExecute(){
// Check feature available
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))

// Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission))

// Request permissions
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
  }
  async moreInfo(item) {
    let alert = this.alertController.create({
      title: item.field2,
      message: `
      <ion-content padding>
      <ion-row>
      <h1 style="font-weight: bold; font-size: 8px; color: #b2b2b2;">${item.field3}</h1>
      </ion-row>
      <ion-row>
      <h4 style="font-weight: bold;font-size: 15px; color: #ff3922;">${item.field4}</h4>
      </ion-row>
      
        <h5>කෙටි නාමයන්හී තේරුම්</h5>
      
      <h6>පු. &nbsp: පුල්ලිංග</h6>
      <h6>ඉ. &nbsp: ඉත්ථිලිංග</h6>
      <h6>න. &nbsp: නපුංසකලිංග</h6>
      <h6>3 &nbsp: තුන්ලිගුවෙහිම යෙදේ</h6>
      <h6>නි. &nbsp: නිපාත</h6>
      <h6>නා. &nbsp: නාමපද</h6>
      <h6>ස. &nbsp: සමාස</h6>
      <h6>පු.ක්‍රි &nbsp : පුර්වක්‍රියා</h6>
      <h6>අ.ක්‍රි &nbsp: අතිත ක්‍රියා</h6>
      <h6>ක්‍රි.වි &nbsp: ක්‍රියා විශේෂන</h6>
      <h6>සි. &nbsp: සිංහල වචන</h6>
      </ion-content padding>
      `,
      cssClass:'alert-danger',
      buttons: [ {
        text: 'Back',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }]
    });
    await alert.present();
  }
  async typeChange(ev:any){
    let alert = this.alertController.create();
    alert.setCssClass('alert-success')
    alert.setTitle('Convert To');
    alert.addInput({type: 'radio', label: 'සිංහල --> පාලී', value: '1', checked: true});
    alert.addInput({type: 'radio', label: 'පාලී --> සිංහල', value: '2'});
    await alert.present();
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        this.type = parseInt(data)
        Settings.type = this.type;
      }
    });
  }
  offlineSearch(ev){
      console.log(ev.target.value);
    let val = ev.target.value;
    console.log(ev);
    if(this.tempItem.length >0){
      if (val && val.trim() != '') {
        this.Item = this.tempItem.filter((item) => {
          if(item.field1.toLowerCase().indexOf(val.toLowerCase()) > -1){
            return item.field1.toLowerCase().indexOf(val.toLowerCase()) > -1
          }else {
            return (item.field2.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        })
      }else{
        this.Item = this.tempItem;
      }
    }
  }
}
