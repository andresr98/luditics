//Componentes de Ionic
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";

//Importación de provider
import { AssistanceProvider } from "../../providers/assistance/assistance";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { UtilitiesProvider } from "../../providers/utilities/utilities";

import { Assistance } from "../../models/Assistance";
import { Group } from "../../models/Group";

@IonicPage()
@Component({
  selector: "page-assistance",
  templateUrl: "assistance.html"
})
export class AssistancePage {
  list: Assistance[][] = [];
  assistance: Assistance;
  formatDate: string;
  counterTaps: number = 0;
  changed: boolean = false;
  group: Group;
  connectionError: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private assistanceProvider: AssistanceProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private screenO: ScreenOrientation,
    private utilitiesProvider: UtilitiesProvider
  ) {
    let date = new Date().toLocaleDateString().split("/");
    this.formatDate = date[2] + "-" + date[1] + "-" + date[0];
    this.group = this.navParams.data.group;
    this.getAssistances(this.group.grupo__id, this.formatDate);
  }

  ionViewCanEnter() {
    //this.screenO.lock('landscape');
    this.connectionError = false;
  }

  retry() {
    this.getAssistances(this.group.grupo__id, this.formatDate);
  }
  getAssistances(idGroup: number, date: string) {
    var loading = this.loadingCtrl.create({
      content: "Cargando Asistencia..."
    });
    loading.present();
    this.assistanceProvider.getAssistances(idGroup, date).subscribe(
      data => {
        let sortStudents = this.utilitiesProvider.sortStudents(data.entity);
        if (sortStudents.length > 0) {
          this.list = this.utilitiesProvider.setEmptyStudent(sortStudents);
          this.list.forEach(fila => {
            fila.forEach(element => {
              if (element.asistencia == 1) element.asistenciaClass = "onTime";
              else if (element.asistencia == 2)
                element.asistenciaClass = "late";
              else if (element.asistencia == 3)
                element.asistenciaClass = "miss";
              else element.asistenciaClass = "item-view-empty";

              element.changed = false;
            });
          });

          this.connectionError = false;
        }
        loading.dismissAll();
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
    assistance.changed = true;
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

  showMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }

  updateAssistances() {
    var loading = this.loadingCtrl.create({
      content: "Actualizando la asistencia..."
    });
    loading.present();
    this.list.forEach(row => {
      row.forEach(element => {
        if (
          element.changed &&
          element.grupoxestudiante__estudiante_id__id != undefined
        ) {
          this.assistanceProvider
            .updateAssistances(
              this.group.grupo__id,
              element.grupoxestudiante__estudiante_id__id,
              this.formatDate,
              element.asistencia
            )
            .subscribe(
              data => {},
              error => {
                this.showMessage(
                  "Verifique su conexión a internet. No se puede actualizar la asistencia"
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

  insertAssistances() {
    var loading = this.loadingCtrl.create({
      content: "Insertando asistencias a la base de datos..."
    });
    loading.present();

    this.assistanceProvider
      .insertAssistances(this.group.grupo__id, this.formatDate)
      .subscribe(
        data => {
          if (data.status == 201) {
            loading.dismissAll();
            this.getAssistances(this.group.grupo__id, this.formatDate);
          }
        },
        error => {
          loading.dismissAll();
        }
      );
  }
}
