import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Estudiante } from "../../models/Estudiante";

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API: string = "http://andresr.pythonanywhere.com/estudiantes/";
@Injectable()
export class StudentProvider {
  constructor(public http: HttpClient) {
    console.log("Hello StudentProvider Provider");
  }

  obtenerSeguimiento() {
    return this.http.get<Estudiante[]>(API);
  }
}
