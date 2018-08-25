import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the CalificacionesPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calificaciones',
  templateUrl: 'calificaciones.html'
})
export class CalificacionesPage {

  valoresRoot = 'ValoresPage'


  constructor(public navCtrl: NavController) {}

}
