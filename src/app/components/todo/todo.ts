import { Component } from '@angular/core';
import { TodoStore, Todo } from './todo.service';

@Component({
  selector: 'todo-app',
  template: `
  <section class="todoapp" *ngIf="!_todoStore.apiUrl">
    <input class="new-todo" 
               placeholder="Enter your api url"         
               #api
               (keyup.enter)="setApiUrl(api.value)">
  </section>
  <section class="todoapp" *ngIf="_todoStore.apiUrl">
    <header class="header" >
      <h1>todos</h1>
      <input class="new-todo" 
             placeholder="What needs to be done?"             
             [(ngModel)]="newTodoText" 
             (keyup.enter)="addTodo()">
    </header>
    <section class="main" *ngIf="_todoStore.todos.length > 0">
      <input class="toggle-all" 
             type="checkbox" 
             *ngIf="_todoStore.todos.length" 
             #toggleall 
             [checked]="_todoStore.allCompleted()" 
             (click)="_todoStore.setAllTo(toggleall.checked)">
      <ul class="todo-list">
        <li *ngFor="let todo of _todoStore.todos" 
            [class.completed]="todo.completed" 
            [class.editing]="todo.editing">
          <div class="view">
            <input class="toggle" 
                   type="checkbox" 
                   (click)="toggleCompletion(todo)" 
                   [checked]="todo.completed"
            >
            <label (dblclick)="editTodo(todo)">{{todo.title}}</label>
            <button class="destroy" (click)="remove(todo)"></button>
          </div>
          <input class="edit" 
                 *ngIf="todo.editing" 
                 [value]="todo.title" 
                 #editedTodo 
                 (blur)="stopEditing(todo, editedTodo.value)" 
                 (keyup.enter)="updateEditingTodo(todo, editedTodo.value)" 
                 (keyup.escape)="cancelEditingTodo(todo)">
        </li>
      </ul>
    </section>
    <footer class="footer" *ngIf="_todoStore.todos.length > 0">
      <span class="todo-count">
        <strong>{{ _todoStore.getRemaining().length }}</strong> 
          {{ _todoStore.getRemaining().length == 1 ? 'item' : 'items'}} left
        </span>
      <button class="clear-completed" 
              *ngIf="_todoStore.getCompleted().length > 0" 
              (click)="removeCompleted()">Clear completed
      </button>
    </footer>
</section>

  `
})

export class TodoApp {
  newTodoText: string = '';

  constructor(private _todoStore: TodoStore) {}

  setApiUrl(url): void {
    this._todoStore.updateApiUrl(url);
  }
  addTodo(): void {
    if (this.newTodoText.trim().length) {
      this._todoStore.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  editTodo(todo: Todo): void {
    todo.editing = true;
  }

  cancelEditingTodo(todo: Todo): void {
    todo.editing = false;
  }

  stopEditing(todo: Todo, editedTitle: string): void {
    todo.title = editedTitle;
    this._todoStore.update(todo);
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string): void {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this._todoStore.remove(todo);
    }
    todo.title = editedTitle;
    this._todoStore.update(todo);

  }

  remove(todo: Todo): void {
    this._todoStore.remove(todo);
  }

  toggleCompletion(todo: Todo): void {
    this._todoStore.toggleCompletion(todo);
  }

  removeCompleted(): void {
    this._todoStore.removeCompleted();
  }
}
