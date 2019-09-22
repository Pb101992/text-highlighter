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

  private modal:any;
  private title:string;
  private span:any;
  private addClicked=false;
  private updateClicked=false;
  
  private oldTitle:string;
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
add() {
  this.modal.style.display = "block";
  this.addClicked=true;
  this.title="Add Data";
}

// When the user clicks on the update button, open the modal and set for data
update() {
  
  this.modal.style.display = "block";
  this.updateClicked=true;
  this.title="Update Data";
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

}
//calls parent function for add data
addText() {
  let data=this.form.value;
  data['selected']=true;
  //this.appService.fullData.push(data);
  this.addClicked=false;
  this.selectChange.emit(data);
  this.close();
}

//update data
UpdateText(){
 // console.log(this.form.value);
 let data=this.form.value;
 data['oldTitle']=this.oldTitle;
 //this.appService.fullData.push(data);
 this.addClicked=false;
 this.updateData.emit(data);
 this.close();
}

// When the user clicks on <span> (x), close the modal
close() {
  this.modal.style.display = "none";
}

}