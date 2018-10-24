import { Injectable } from "@angular/core";
import { isNil } from "lodash";
/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {
  emptyStudent: any = {};

  constructor() {}
  
  sortStudents(data: any[]): any[][] {
    return data.reduce<any[][]>((accumulator, student, index) => {
      const row = student.grupoxestudiante__fila;
      const column = student.grupoxestudiante__columna;

      if (isNil(accumulator[row])) {
        accumulator[row] = new Array(6);
      }
      accumulator[row][column] = student;
      return accumulator;
    }, []);
  }

  setEmptyStudent(data: any[][]) {
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
}
