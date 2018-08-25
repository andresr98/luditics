import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ValoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valores',
  templateUrl: 'valores.html',
})
export class ValoresPage {

  idEstudianet : String;
  type : any = {
    esto : String,
    id : String
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idEstudianet = navParams.get("idEstudiante")
    this.type.esto = "Comportamiento";
  }

  ionViewDidLoad() {
    console.log(this.idEstudianet);
  }

}
