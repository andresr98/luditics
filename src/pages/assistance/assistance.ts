//Componentes de Ionic
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, LoadingController} from "ionic-angular";
import { isNil } from "lodash";

//Importación de provider
import { AssistanceProvider } from "../../providers/assistance/assistance";

import { Assistance } from "../../models/Assistance";

@IonicPage()
@Component({
  selector: "page-assistance",
  templateUrl: "assistance.html"
})
export class AssistancePage {
  list: Assistance[][] = [];
  assistance: Assistance;
  formatDate: string;
  counterTaps : number = 0;
  changed : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private assistanceProvider: AssistanceProvider,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController
  ) {
    let date = new Date().toLocaleDateString().split("/");
    this.formatDate = date[2] + "-" + date[1] + "-" + date[0];
    this.getAssistances(2, this.formatDate);
  }

  getAssistances(idGroup : number, date :string){
    var loading = this.loadingCtrl.create({
      content: "Cargando Asistencia..."
    });
    loading.present();
    this.assistanceProvider.getAssistances(2, date).subscribe(
      data => {
        this.list = this.sortStudentsByIndex(data.entity);
        this.list.forEach(fila => {
          fila.forEach(element => {
            if (element.asistencia == 1) element.asistenciaClass = "onTime";
            else if (element.asistencia == 2) element.asistenciaClass = "late";
            else element.asistenciaClass = "miss";

            element.changed=false;
          });
        });
        loading.dismissAll();
      },
      error => {
        loading.dismissAll();
        this.showMessage(
          "Verifique su conexión a internet. No se puede acceder al servidor"
        );
      }
    );
  }

  tapEvent(event, assistance: Assistance) {
    this.assistance = assistance;
    if (assistance.asistencia == 1) {
      assistance.asistencia = 2;
      assistance.asistenciaClass = "late";
    } else if (assistance.asistencia == 2) {
      assistance.asistencia = 1;
      assistance.asistenciaClass = "onTime";
    } else {
      assistance.asistencia = 2;
      assistance.asistenciaClass = "late";
    }
    this.changed = true;
    assistance.changed= true;
    event.preventDefault();
  }
  pressEvent(event, assistance: Assistance) {
    this.assistance = assistance;
    if (assistance.asistencia == 1) {
      assistance.asistencia = 3;
      assistance.asistenciaClass = "miss";
    } else if (assistance.asistencia == 3) {
      assistance.asistencia = 1;
      assistance.asistenciaClass = "onTime";
    } else {
      assistance.asistencia = 3;
      assistance.asistenciaClass = "miss";
    }
    this.changed = true;
    assistance.changed = true;
    event.preventDefault();
  }

  sortStudentsByIndex(data: Assistance[]): Assistance[][] {
    return data.reduce<Assistance[][]>((accumulator, assistance, index) => {
      const row = Math.floor(index / 5);
      const column = index % 5;

      if (isNil(accumulator[row])) {
        accumulator[row] = [];
      }

      accumulator[row][column] = assistance;
      return accumulator;
    }, []);
  }

  showMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }

  updateAssistances(){
    var loading = this.loadingCtrl.create({
      content: "Actualizando la asistencia..."
    });
    loading.present();
    this.list.forEach(row => {
      row.forEach(element => {
        if(element.changed){
          this.assistanceProvider.updateAssistances(2,element.grupoxestudiante__estudiante_id__id,
            this.formatDate,element.asistencia).subscribe(
              data=>{
            },
            error => {
              this.showMessage("Verifique su conexión a internet. No se puede actualizar la asistencia");
              loading.dismissAll();
            });
        }
      }); 
    });
    loading.dismiss()
    this.changed = false;
  }

  insertAssistances(){
    var loading = this.loadingCtrl.create({ content: "Insertando asistencias a la base de datos..." });
    loading.present();

    this.assistanceProvider.insertAssistances(2,this.formatDate).subscribe(
      data => {
        if (data.status == 201) {
          loading.dismissAll();
          this.getAssistances(2,this.formatDate);
      } 
    },
    error => {
      loading.dismissAll();
    });
  }
}
