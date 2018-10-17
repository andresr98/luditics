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
  counterTaps: number = 0;
  changed: boolean = false;
  group: number = 2;

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

  /* sortStudentsByIndex(data: Student[]): Student[][] {
    return data.reduce<Student[][]>((accumulator, student, index) => {
      const row = Math.floor(index / 5);
      const column = index % 5;

      if (isNil(accumulator[row])) {
        accumulator[row] = [];
      }

      accumulator[row][column] = student;
      return accumulator;
    }, []);
  } */

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


  // sortStudentsByIndex(data: Student[]): Student[][] {
  //   return data.reduce<Student[][]>((accumulator, student, index) => {
  //     const row = Math.floor(index / 5);
  //     const column = index % 5;

  //     if (isNil(accumulator[row])) {
  //       accumulator[row] = [];
  //     }
  //     student.grupoxestudiante__fila = row;
  //     student.grupoxestudiante__columna = column;

  //     this.studentProvider.updateStudent(2,student.id,student.grupoxestudiante__fila,student.grupoxestudiante__columna).subscribe(
  //       data => {
  //         console.log("Se insertó el estudiante "+student.id);
  //       },
  //       error=>{
  //         "Verifique su conexión a internet. No se puede acceder al servidor";
  //       }
  //     );
  //     console.log("id_student: "+student.id+". fila: "+student.grupoxestudiante__fila+". col: "+student.grupoxestudiante__columna);
  //     accumulator[row][column] = student;
  //     return accumulator;
  //   }, []);
  // }

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
