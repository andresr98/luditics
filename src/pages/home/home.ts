import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { SeguimientosPage } from "../seguimientos/seguimientos";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { isNil } from "lodash";
import { StudentProvider } from "../../providers/student/student";
import { Student } from "../../models/Student";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  list: Student[][] = [];
  constructor(
    public navCtrl: NavController,
    private screenO: ScreenOrientation,
    private studentProvider: StudentProvider
  ) 
  {
    //Activar cuando se pase a producción
    //this.screenO.lock('landscape');
  }

  sortStudentsByIndex(data: Student[]): Student[][] {
    return data.reduce<Student[][]>((accumulator, student, index) => {
      const row = Math.floor(index / 5);
      const column = index % 5;

      if (isNil(accumulator[row])) {
        accumulator[row] = [];
      }

      accumulator[row][column] = student;
      return accumulator;
    }, []);
  }

  sendValues(student) {
    this.navCtrl.push(SeguimientosPage, {
      student: student
    });
  }

  ionViewWillEnter(grupo: number){
    this.studentProvider.getStudentsByGroup(2).subscribe(data => {
      if(data.status != 200){
        return false;
      }
      this.list = this.sortStudentsByIndex(data.entity);
    })
  }
}
