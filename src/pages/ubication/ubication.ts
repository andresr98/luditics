//Componente de Ionic
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { isNil } from "lodash";

//Importación de providers y modelos
import { Student } from '../../models/Student';
import { StudentProvider } from '../../providers/student/student'

//Importación de componentes nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";

@IonicPage()
@Component({
  selector: 'page-ubication',
  templateUrl: 'ubication.html',
})
export class UbicationPage {
  list: Student[][] = [];
  student: Student;
  studentAux: Student;
  counterTaps: number = 0;
  changed: boolean = false;
  group: number = 2;
  rowAux:number;
  colAux:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private studentProvider: StudentProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private screenO: ScreenOrientation
  ) {
    this.getStudentsByGroup(2);
  }

  getStudentsByGroup(group: number) {
    var loading = this.loadingCtrl.create({
      content: "Cargando Ubicaciones..."
    });
    loading.present();
    this.studentProvider.getStudentsByGroup(group).subscribe(
      data => {
        if (data.status == 200) {
          loading.dismissAll();
          this.list = this.sortStudents(data.entity);
          console.log(this.list);
        }
      },
      error => {
        loading.dismissAll();
        this.showMessage(
          "Verifique su conexión a internet. No se puede acceder al servidor"
        );
      }
    );
  }

  sortStudents(data: Student[]): Student[][] {
    return data.reduce<Student[][]>((accumulator, student, index) => {
      const row = student.grupoxestudiante__fila;
      const column = student.grupoxestudiante__columna;

      if (isNil(accumulator[row])) {
        accumulator[row] = new Array(5);
      }

      accumulator[row][column] = student;
      return accumulator;
    }, []);
  }

  changeSpot(student1:Student, student2:Student) {

  }

  asignUndefined(rw:number, cl:number, student2:Student) {

  }

  tapEvent(event, student: Student, rw: number, cl: number) {
    switch (this.counterTaps) {
      case 0: {
        this.student = student;
        this.counterTaps = 1;
        this.rowAux=rw;
        this.colAux=cl;
        event.preventDefault();
        break;
      }
      case 1: {
        this.studentAux = student;
        if (this.student == undefined && this.studentAux == undefined) {
          console.log("Se seleccionaron 2 vacíos");
        }
        else if (this.student == undefined && this.studentAux != undefined) {
          this.asignUndefined(this.rowAux,this.colAux,this.studentAux);
          console.log("Vacios: f: " + this.rowAux + " c: " + this.colAux + "Estudiante: f:"
            + this.studentAux.grupoxestudiante__fila + " c:" + this.studentAux.grupoxestudiante__columna);
        }
        else if (this.studentAux == undefined && this.student != undefined) {
          this.asignUndefined(this.rowAux,this.colAux,this.studentAux);

          console.log("Vacios: f: " + this.rowAux + " c: " + this.colAux + "Estudiante: f:"
            + this.student.grupoxestudiante__fila + " c:" + this.student.grupoxestudiante__columna);

        }
        else if (this.student != undefined && this.studentAux != undefined) {
          if (this.student.grupoxestudiante__fila === this.studentAux.grupoxestudiante__fila &&
            this.student.grupoxestudiante__columna === this.studentAux.grupoxestudiante__columna) {
            console.log("Se seleccionó el mismo estudiante");
          }
          else{
            console.log("Se seleccionaron 2 estudiantes diferentes.")
          this.changeSpot(this.student,this.studentAux);
          }
        }
        this.counterTaps = 0;
        event.preventDefault();
        break;
      }
      default: {
        this.counterTaps = 0;
        event.preventDefault();
        break;
      }
    }
    event.preventDefault();
    return
  }


  ionViewCanEnter() {
    //this.screenO.lock('landscape');
  }

  showMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }


}
