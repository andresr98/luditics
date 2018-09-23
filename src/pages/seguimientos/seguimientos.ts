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
  behavioralData: BehavioralData;
  formatDate : string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private followUpProvider: FollowUpProvider) {

    this.type = "Comportamiento";
    let imagenes = ["assets/icon/Aislamiento.png", "assets/icon/Frustracion.png", "assets/icon/Impulsividad.png",
      "assets/icon/Solidaridad.png", "assets/icon/Armonioso.png"];
  }

  ionViewCanEnter() {
    this.student = this.navParams.get("student");
    if (this.student === undefined) {
      return false;
    }
    this.getBehavioralFollowUP(this.student);
    return true;
  }

  getBehavioralFollowUP(student: Student) {
    let date = new Date().toLocaleDateString().split("/");
    this.formatDate = date[2] + "-" + date[1] + "-" + date[0];

    this.followUpProvider.getBehavioralFollowUP(this.student.id, 1, this.formatDate).subscribe(data => {
      this.behavioralDatas = data.entity;
    })
  }

  private addAccumulator(data) {
    this.behavioralData = data;

    this.followUpProvider.updateBehavioralFollowUP(this.student.id,this.behavioralData.categoria__id,
      this.formatDate, this.behavioralData.acumulador+1).subscribe(data => {
        let info = data.status;

        if(info == 200){
          this.behavioralData.acumulador += 1;
        }
      });
  }
  private minusAccumulator(data) {
    this.behavioralData = data;

    if(this.behavioralData.acumulador - 1 >= 0)
    {
      this.followUpProvider.updateBehavioralFollowUP(this.student.id, this.behavioralData.categoria__id,
        this.formatDate, this.behavioralData.acumulador-1).subscribe(data =>{
          if(data.status == 200){
            this.behavioralData.acumulador -=1;
          }
        })
    }
  }
}
