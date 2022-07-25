import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  todo:string[] = [];
  done:string[] = [];

  constructor(@Inject(DIALOG_DATA) public data: {todo: string[],done: string[], }) { }


  ngOnInit(): void {
    this.todo= this.data.todo;
    this.done= this.data.done;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  removeAllElement() {
    this.todo.push(...this.done.splice(0,this.done.length));
  }
canDrop(item: CdkDrag, list: CdkDropList) {
  console.log(list.getSortedItems().length);
  return (
   list && list.getSortedItems().length < 4
  );
}
}
