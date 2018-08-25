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

 
  type : any = {
    esto : String,
    id : String
  };

  estudiante : any = {
    nombre : String,
    apellido: String,
    id : Number,
    impulsividad : Number,
    frustracion : Number,
    aislamiento : Number, 
    solidaridad : Number, 
    armonioso : Number

  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.estudiante = navParams.get("estudiante");
    this.type.esto = "Comportamiento";
  }

  ionViewDidLoad() {
    console.log(this.estudiante.impulsividad);
  }

}
