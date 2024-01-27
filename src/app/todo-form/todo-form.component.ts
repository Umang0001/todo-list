import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../utils/interface';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  constructor(private _fb:FormBuilder){}
  onceSubmitted : boolean =false;
  @Output() pushTodo = new EventEmitter<Todo>();
  todoItem =this._fb.group({
    task:["", Validators.required],
    description:["", Validators.required],
    dueDate: ["", [Validators.required, this.dateValidator()]]
  })

  dateValidator() {
    return (date:FormControl)=>{
      let currentDate=new Date();
      let selectedDate= new Date(date.value);
      currentDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      let invalid= selectedDate < currentDate;
      if (date.value !=null && invalid) {
        return{ invalidDate: true };
      }
      return null;
    }
  }

  handleSubmit(){
    this.onceSubmitted=true;
    if (this.todoItem.valid) {
      let id=(new Date().getTime());
      let todo : any={
        ...this.todoItem.value,
        status:"pending",
        id
      }
      this.pushTodo.emit(todo)
      this.todoItem.reset();
      this.onceSubmitted=false;
    }
  }
}