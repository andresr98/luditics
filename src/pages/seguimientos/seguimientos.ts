//Importación de componentes ionic
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Importación de modelos y providers.
import { Student } from '../../models/Student';
import { FollowUpProvider } from '../../providers/follow-up/follow-up'
import {FollowUp} from '../../models/FollowUp'

@IonicPage()
@Component({
  selector: 'page-seguimientos',
  templateUrl: 'seguimientos.html',
})
export class SeguimientosPage {
  type: string;
  student: Student;
  behavioralDatas: Array<FollowUp>;
  followUpData: FollowUp;
  formatDate : string;
  images : string[] = [];

/*Se inyectan las dependencias de: 
     *Controlador de vistas
     *Controlador de parametros
     *Provider para obtener los seguimientos de un estudiante desde el back */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private followUpProvider: FollowUpProvider) {

    //Se deja por defecto el valor de comportamiento para mostrar esta lista en primer lugar.
    this.type = "Comportamiento";
    this.images = ["assets/icon/Aislamiento.png", "assets/icon/Frustracion.png", "assets/icon/Impulsividad.png",
      "assets/icon/Solidaridad.png", "assets/icon/Armonioso.png"];
  }

  //Antes de entrar se trae la información del estudiante por parametro y se obtienen sus seguimientos
  ionViewCanEnter() {
    this.student = this.navParams.get("student");
    if (this.student === undefined) {
      return false;
    }
    this.getBehavioralFollowUP(this.student);
    return true;
  }

  //Se obtiene el seguimeinto comportamental y ético.
  getBehavioralFollowUP(student: Student) {
    //Se formatea la fecha a  YYYY-MM-DD, para enviarla a la base de datos
    let date = new Date().toLocaleDateString().split("/");
    this.formatDate = date[2] + "-" + date[1] + "-" + date[0];

    this.followUpProvider.getBehavioralFollowUP(this.student.id, 1, this.formatDate).subscribe(data => {
      this.behavioralDatas = data.entity;
      this.behavioralDatas.forEach(element => {
        element.changed = false;
      });
    })
  }

  /**
   * Se obtiene el dato enviado
   * Se actualiza el valor del campo siempre que el servidor retorne un estado 200 'OK'
   * updateBehavioralFollowUP(id_estudiante, id_categoria, fecha, valor)
   * Ej: updateBehavioralFollowUP(1,1, 2018-05-22,5)
   * 
   * No se envian datos negativos.
   */
  private addAccumulator(data) {
    this.followUpData = data;
    this.followUpData.acumulador += 1;
    this.followUpData.changed = true;
  }
  private minusAccumulator(data) {
    this.followUpData = data;
    let accumulator = this.followUpData.acumulador -1;
    if(accumulator >= 0)
    {
      this.followUpData.acumulador -=1;
      this.followUpData.changed = true;
    }
  }

  ionViewWillLeave(){
    this.behavioralDatas.forEach(element => {
      if(element.changed){
        this.followUpProvider.updateBehavioralFollowUP(this.student.id, element.categoria__id,
          this.formatDate, element.acumulador).subscribe(data => {
          });
      }
    });
  }
}
