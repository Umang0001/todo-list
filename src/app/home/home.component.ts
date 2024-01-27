import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import {Todo} from '../utils/interface'
import { TodoTableComponent } from '../todo-table/todo-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoTableComponent,CommonModule,TodoFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  constructor(private _ref:ElementRef){}
  ngAfterViewInit(){
    this.todoWrapper=this._ref.nativeElement.querySelector(".todo-fixed");
  }
  todoWrapper:any;
  todoList : Todo[]= [];
  pushTodo(todo: Todo){
      this.todoList.push(todo);
      this.handleClose();
  }

  modifyStatus({index,status,completedOn}:any){
    this.todoList[index].status=status;
    if (status==="completed") {
      this.todoList[index].dueDate += ` (completed on ${completedOn})`;
    }
    else{
      let originalDate= this.todoList[index].dueDate.split(" ")[0];
      this.todoList[index].dueDate= originalDate;
    }
  }

  deleteTodo(index:any){
    this.todoList.splice(index, 1);
  }

  handleAddNew(){
    let isOpen=this.todoWrapper.classList.contains("open");
    if (isOpen) {
      this.handleClose()
    }
    else{
      this.handleOpen()
    }
  }

  handleOpen(){
    this.todoWrapper.classList.add("open");
    setTimeout(() => {
      this.todoWrapper.querySelector(".task-name").focus();
    }, 100);
  }
  handleClose(){
    this.todoWrapper.classList.remove("open");
  }
}
