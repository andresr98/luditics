import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Student } from '../../models/Student';
import { FollowUpProvider } from '../../providers/follow-up/follow-up'
import { BehavioralData } from '../../models/BehavioralData';

@IonicPage()
@Component({
  selector: 'page-seguimientos',
  templateUrl: 'seguimientos.html',
})
export class SeguimientosPage {
  type: string;
  student: Student;
  behavioralDatas: Array<BehavioralData>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private followUpProvider: FollowUpProvider) {

    this.student = this.navParams.get("student");
    this.type = "Comportamiento";
    let date = new Date().toLocaleDateString().split("/");
    
    let formatDate = date[2] + "-" + date[1] + "-" + date[0];
    this.followUpProvider.getBehavioralFollowUP(this.student.id, 1, formatDate).subscribe(data => {
      this.behavioralDatas = data.entity
    })

    let imagenes = ["assets/icon/Aislamiento.png", "assets/icon/Frustracion.png", "assets/icon/Impulsividad.png",
    "assets/icon/Solidaridad.png", "assets/icon/Armonioso.png"];
  }

  ionViewWillEnter() {
  }


  getBehavioralFollowUP(student: Student) {
  }

  private sumarCategoria(dato) {
    //Aquí se llama al servicio para sumarle uno
    console.log(dato);
    /*
    switch(this.dato.categoria)
    {
      case "Aislamiento" : this.estudiante.aislamiento = this.dato.repeticiones; break;
      case "Frustración" : this.estudiante.frustracion = this.dato.repeticiones; break;
      case "Impulsividad" : this.estudiante.impulsividad = this.dato.repeticiones; break;
      case "Solidaridad" : this.estudiante.solidaridad = this.dato.repeticiones; break;
      case "Armonioso" : this.estudiante.armonioso = this.dato.repeticiones; break;
    }*/
  }
  private restarCategoria(dato) {
    /*
    switch(this.dato.categoria)
    {
      case "Aislamiento" : this.estudiante.aislamiento = this.dato.repeticiones; break;
      case "Frustración" : this.estudiante.frustracion = this.dato.repeticiones; break;
      case "Impulsividad" : this.estudiante.impulsividad = this.dato.repeticiones; break;
      case "Solidaridad" :  this.estudiante.solidaridad = this.dato.repeticiones; break;
      case "Armonioso" : this.estudiante.armonioso = this.dato.repeticiones; break;
    }*/
  }
}
