import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API: string = "http://andresr.pythonanywhere.com/";

@Injectable()
export class GroupProvider {

  constructor(public http: HttpClient) {
  }

  getGroups(idTeacher : number){
    return this.http.get<any>(API + "grupos?id_profesor=" + idTeacher);
  }

}
