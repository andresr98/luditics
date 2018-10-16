import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API: string = "http://andresr.pythonanywhere.com/";
@Injectable()
export class StudentProvider {
  constructor(public http: HttpClient) {
  }

  getStudents() {
    return this.http.get<any>(API + "/estudiantes/");
  }
  
  getStudentsByGroup(group: number){
    return this.http.get<any>(API + "/estudiantes?id_grupo=" + group);
  }
}
