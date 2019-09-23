import { Component,ViewChild,ElementRef,Output,EventEmitter } from '@angular/core';
import { FormControl,Validators ,FormGroup} from '@angular/forms';

import {AppService} from "../app.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  //used to show hide modal window
  @ViewChild("updateWindow") updateWindow: ElementRef;
  //used to close the window
  @ViewChild("closeButton") closeButton: ElementRef;
  @Output() selectChange = new EventEmitter();
  @Output() updateData = new EventEmitter();
  @Output() deleteData = new EventEmitter();

  private modal:any;
  private title:string;
  private span:any;
  private addClicked=false;
  private updateClicked=false;
  private deleteClicked=false;
  private oldTitle:string;
  deleteIndex:any;
  //reactive for formgroup to get/set data
  form = new FormGroup({
    title : new FormControl('',Validators.required),
    desc :new FormControl('',Validators.required)
  });

  constructor(private appService:AppService){

  }
  ngAfterViewInit(){  
    // Get the modal
 this.modal = this.updateWindow.nativeElement;
// Get the <span> element that closes the modal
 this.span = this.closeButton.nativeElement;
  }
// When the user clicks on the add button, open the modal
openModal(title){
  this.modal.style.display = "block";
  this.title=title;

}
add() {
  this.addClicked=true;
  this.openModal("Add Data");
  }

// When the user clicks on the update button, open the modal and set for data
update() {
  
  this.updateClicked=true;
  this.openModal("Update Data");
  this.oldTitle=this.form.value['title']
  let data=this.appService.fullData;
  for(let i=0;i<data.length;i++){
   if(data[i]['selected']){
     this.form.setValue({'title':data[i]['title'],'desc':data[i]['desc']});
   }
 }
}
//delete data from json
delete(){
  this.deleteClicked=true;
  this.openModal("Delete Data");
}
confirm(){
  let data=this.appService.fullData;
 for(let i=0;i<data.length;i++){
   if(data[i]['selected']){
    this.deleteIndex=i;
    this.deleteData.emit(i);
    break;
   }
 }
this.close();
}
//calls parent function for add data
addText() {
  let data=this.form.value;
  data['selected']=true;

  this.selectChange.emit(data);
  this.close();
}

//update data
UpdateText(){
 let data=this.form.value;
 data['oldTitle']=this.oldTitle;
 this.updateData.emit(data);
 this.close();
}

// When the user clicks on <span> (x), close the modal
close() {
  this.addClicked=false;
  this.deleteClicked=false;
  this.updateClicked=false;
  this.modal.style.display = "none";
}

}