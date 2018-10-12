import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API: string = "http://andresr.pythonanywhere.com/";
@Injectable()
export class AssistanceProvider {
  constructor(public http: HttpClient) {}

  insertAssistances(idGroup: number, date: string) {
    return this.http.post<any>(API + "asistencias/", {
      id_grupo: idGroup,
      fecha: date
    });
  }
  getAssistances(idGroup: number, date: string) {
    return this.http.get<any>(
      API + "asistencias?" + "id_grupo=" + idGroup + "&fecha=" + date
    );
  }
}
