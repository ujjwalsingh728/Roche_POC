import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragExit,
  CdkDragHandle,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {MatDialog} from '@angular/material/dialog';
import { DragdropComponent } from 'src/dragdrop/dragdrop.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo:string[] = [ '99985', 'Go home', 'Fall asleep','Get up', 'Brush teeth',
    'Cencer reasearch', 'Check e-mail', 'Walk dog','be human'];

  done:string[] = [];

  compareButtonShow: boolean = false;

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else  {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  deleteSelected(i: number) {

      console.log(i);
    this.todo.push(...this.done.splice(i, 1));


  }
  checkNumberInDoneList():boolean{
    return true;
  }

  toggle():boolean{
    if(this.done.length > 1){
      return true;
    }else {
      return false;
    }
  }

  changeColor() :string{
    if(this.done.length > 1){
      return 'purple';
    }else{
      return 'gray';
    }
  }

  removeAllElement() {
    this.todo.push(...this.done.splice(0,this.done.length));

  }
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DragdropComponent,{
      data: {todo: this.todo, done: this.done},
      width: '50%',
      height: '80%',
      position: { right: '10%',top: '5%'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
