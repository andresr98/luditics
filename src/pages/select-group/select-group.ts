import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {GroupProvider} from '../../providers/group/group'
import { Group } from '../../models/Group';
import {TabsPage} from '../tabs/tabs'

import { ScreenOrientation } from "@ionic-native/screen-orientation";

@IonicPage()
@Component({
  selector: 'page-select-group',
  templateUrl: 'select-group.html',
})
export class SelectGroupPage {

  idGroup : number;
  groups : Array<Group> = [];
  group : Group;
  tabsPage : any = TabsPage;
  bool : boolean = false;

  constructor(public navCtrl: NavController, 
     public navParams: NavParams,
     private groupProvider : GroupProvider,
     private screenO : ScreenOrientation) {

    this.getGroups(1);
    this.idGroup = 0;
  }

  getGroups(idTeacher : number){
    this.groupProvider.getGroups(idTeacher).subscribe(data => {
      if(data.status == 200){
        this.groups = data.entity
      }
    },
    error => {
      console.log("No traje grupos");
    });
  }

  sendValues(){
    for(let i = 0; i < this.groups.length; i++){
      this.group = this.groups[i];

      if(this.group.grupo__id == this.idGroup) break;
    }

    this.navCtrl.push(this.tabsPage,{"group": this.group, "nav": this.navCtrl});
  }

  ionViewCanEnter(){
    //this.screenO.lock('landscape');
  }
}
