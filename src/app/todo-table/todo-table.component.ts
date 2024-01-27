import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../utils/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss'
})
export class TodoTableComponent {
  @Input() todoList:Todo[]=[];
  @Output() modifyTodo= new EventEmitter();
  @Output() deleteTodo= new EventEmitter();
  handleChange(todo:Todo,event : Event,i:number){
    let checked= (event.target as HTMLInputElement).checked;
    let data={
      index:i,
      status:checked?"completed":"pending",
      completedOn:this.formatDate(new Date())
    }
      this.modifyTodo.emit(data)
  }
  handleDelete(index:number){
    this.deleteTodo.emit(index);
  }

  formatDate(date: Date): string {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year: number = date.getFullYear();
  
    // Ensure that day and month are formatted as two digits
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
}
