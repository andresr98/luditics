//Componente de Ionic
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";
import { isNil } from "lodash";

//Importación de providers y modelos
import { Student } from "../../models/Student";
import { StudentProvider } from "../../providers/student/student";

//Importación de componentes nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Group } from "../../models/Group";

@IonicPage()
@Component({
  selector: "page-ubication",
  templateUrl: "ubication.html"
})
export class UbicationPage {
  list: Student[][] = [];
  student: Student;
  studentAux: Student;
  counterTaps: number = 0;
  group : Group;
  rowAux: number;
  colAux: number;
  changed: boolean = false;
  emptyStudent: any = {};
  connectionError : boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private studentProvider: StudentProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private screenO: ScreenOrientation
  ) {
    this.group = this.navParams.data.group;
    this.getStudentsByGroup(this.group.grupo__id);
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
          let a = this.sortStudents(data.entity);
          if(a.length > 0){
            this.list = this.setEmptyStudent(a);
          }
        }

        this.connectionError = false;
      },
      error => {
        loading.dismissAll();
        this.showMessage(
          "Verifique su conexión a internet. No se puede acceder al servidor"
        );
        this.connectionError = true;
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

  setEmptyStudent(data: Student[][]) {
    let rows = data.length;
    let columns = data[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (data[i][j] == undefined) {
          this.emptyStudent = { empty: true };
          data[i][j] = this.emptyStudent;
        }
      }
    }
    return data;
  }

  asignUndefined(rw: number, cl: number, student: Student) {
    student.grupoxestudiante__fila = rw;
    student.grupoxestudiante__columna = cl;
  }

  updateUbications() {
    var loading = this.loadingCtrl.create({
      content: "Actualizando las ubicaciones..."
    });
    loading.present();
    this.list.forEach(row => {
      row.forEach(element => {
        element.ubicationClass="";
        if (element.changed && element.id != undefined) {
          this.studentProvider
            .updateStudent(
              this.group.grupo__id,
              element.id,
              element.grupoxestudiante__fila,
              element.grupoxestudiante__columna
            )
            .subscribe(
              data => {},
              error => {
                this.showMessage(
                  "Verifique su conexión a internet. No se pueden actualizar las ubicaciones"
                );
                loading.dismissAll();
              }
            );
        }
      });
    });
    loading.dismiss();
    this.changed = false;
  }

  tapEvent(event, student: Student, rw: number, cl: number) {
    student.ubicationClass = "selected";
    switch (this.counterTaps) {
      case 0: {
        this.student = student;
        this.asignUndefined(rw, cl, this.student);
        this.counterTaps = 1;
        this.rowAux = rw;
        this.colAux = cl;
        event.preventDefault();
        break;
      }
      case 1: {
        this.studentAux = student;
        this.asignUndefined(rw, cl, this.studentAux);
        this.counterTaps = 0;
        this.changed = true;
        let flag = this.list[this.student.grupoxestudiante__fila][
          this.student.grupoxestudiante__columna];
        this.list[this.student.grupoxestudiante__fila][
          this.student.grupoxestudiante__columna] 
          = this.list[this.studentAux.grupoxestudiante__fila][
          this.studentAux.grupoxestudiante__columna];
        this.list[this.studentAux.grupoxestudiante__fila][
          this.studentAux.grupoxestudiante__columna] = flag;
        this.student.ubicationClass = "changed";
        this.studentAux.ubicationClass = "changed";
        event.preventDefault();
        this.studentAux.changed = true;
        this.student.changed = true;
        this.student.grupoxestudiante__fila = this.studentAux.grupoxestudiante__fila;
        this.student.grupoxestudiante__columna = this.studentAux.grupoxestudiante__columna;
        this.studentAux.grupoxestudiante__fila = this.rowAux;
        this.studentAux.grupoxestudiante__columna = this.colAux;
        break;
      }
      default: {
        this.counterTaps = 0;
        event.preventDefault();
        break;
      }
    }
    event.preventDefault();
    return;
  }

  retry(){
    this.getStudentsByGroup(this.group.grupo__id);
  }

  ionViewCanEnter() {
    //this.screenO.lock('landscape');
    this.connectionError = false;
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
