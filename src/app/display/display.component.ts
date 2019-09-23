import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AppService} from "../app.service";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent {
  private content: string;
    public query: string;
    private fullContent: any;
    private titles=[];
    public objectKeys = Object.keys;
    private text='';
    private searchedWordsControl = new FormControl('');
    public constructor(private appService:AppService) {
      this.showConfig();
      this.fullContent=this.appService.fullData;
    }
   
    //search text in full content and if it exists highlights the title
    textChanged() {
      let value=this.searchedWordsControl.value;
      for(let i=0;i<this.fullContent.length;i++){
        if(value!="" && this.fullContent[i]['desc'].includes(value))
        {
          this.fullContent[i]['highlight']=true;
        }else{
          this.fullContent[i]['highlight']=false;
        }
      }
     }
  
    //sunscribe data from appservice and maps to UI 
    showConfig() {
      this.appService.getConfig()
        .subscribe((data) => {
          this.fullContent=data['data'];
          this.text= this.fullContent[0]['desc'];
          this.appService.fullData=this.fullContent;
          console.log(data);   
        });
    }

  

  //Data for directive for initialization
  searchedWords$: Observable<string[]> = this
    .searchedWordsControl
    .valueChanges
    .pipe(
      map((search: string) => search.trim().split(' '))
    )

   //called from child when new data added to select it by default
    selectChange(data){
      this.fullContent.push(data);
      this.getData(data['title']);
    }

    //called from child when data is updated
    updateData(data){
      for(let i=0;i<this.fullContent.length;i++){

        if(this.fullContent[i]['title']===data['oldTitle']){
          this.fullContent[i]['title']=data['title'];
          this.fullContent[i]['desc']=data['desc'];
          this.getData(data['title']);
          }
       
      }
    }
    deleteData(i){
      this.fullContent.splice(i,1);
      if(i===this.fullContent.length-1)
      this.getData(this.fullContent[0]['title']);
      else
      this.getData(this.fullContent[i]['title']);
    }
    //Called when title is clicked from left navigation bar to display its decription
    getData(key){
      for(let i=0;i<this.fullContent.length;i++){

        if(this.fullContent[i]['title']===key){
          this.text=this.fullContent[i]['desc'];
          this.fullContent[i]['selected']=true;
        }
        else{
          this.fullContent[i]['selected']=false;
        }
      }
    }
}
