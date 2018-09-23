import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API: string = "http://andresr.pythonanywhere.com/";
@Injectable()
export class StudentProvider {
  constructor(public http: HttpClient) {
    console.log("Hello StudentProvider Provider");
  }

  getStudents() {
    return this.http.get<any>(API + "/estudiantes/");
  }
  
  getStudentsByGroup(grupo: number){
    return this.http.post<any>(API + "/estudiantes/", {"grupo": grupo});
  }
}
