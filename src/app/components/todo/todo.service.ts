import { Injectable } from '@angular/core';
import { Http, Headers, Response }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

export class Todo {
  id: string;
  completed: boolean;
  editing: boolean;
  title: string;

  constructor(id: string, title: string, completed: boolean) {
    this.id = id;
    this.completed = completed;
    this.editing = false;
    this.title = title.trim();
  }
}

@Injectable()
export class TodoStore {
  todos: Array<Todo>;

  private headers = new Headers({'Content-Type': 'application/json'});
  public apiUrl = '';  // URL to web api

  constructor(private http: Http) {
    this.todos = [];
    if(this.apiUrl) {
      this.http.get(this.apiUrl)
        .toPromise()
        .then(response => {
          let data = response.json();
          data.forEach(item => {
            const newTodo = new Todo(item.id,item.title,item.completed);
            this.todos.push(newTodo);
          })
        })
    }
  }
  
  private updateStore(): void {
    localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
  }
  
  private getWithCompleted(completed: boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }

  updateApiUrl(url) {
    this.apiUrl = url;
    this.http.get(this.apiUrl)
        .toPromise()
        .then(response => {
          let data = response.json();
          data.forEach(item => {
            const newTodo = new Todo(item.id,item.title,item.completed);
            this.todos.push(newTodo);
          })
        })
  }
  allCompleted(): boolean {
    return this.todos.length === this.getCompleted().length;
  }

  setAllTo(completed: boolean): void {
    this.todos.forEach((t: Todo) => {
      t.completed = completed;
      this.http.put(`${this.apiUrl}/${t.id}`, JSON.stringify(t),this.headers)
          .map((result: Response) => console.log(result));
    });
  }

  removeCompleted(): void {
    this.http.delete(this.apiUrl)
        .toPromise()
        .then(response => {
          this.todos = this.getWithCompleted(false);
        });
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }
  
  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    console.log(todo);
    this.http.put(`${this.apiUrl}/${todo.id}`, JSON.stringify(todo),this.headers)
        .toPromise()
        .then(response => console.log(response));
  }

  update(todo: Todo) {
    this.http.put(`${this.apiUrl}/${todo.id}`, JSON.stringify(todo),this.headers)
        .toPromise()
        .then(response => console.log(response));
  }
  remove(todo: Todo): void {
    this.http.delete(`${this.apiUrl}/${todo.id}`)
        .toPromise()
        .then(res => {
          this.todos.splice(this.todos.indexOf(todo), 1);
        });
  }
  
  add(title: string): void {
    this.http.post(this.apiUrl,JSON.stringify({title:title}),this.headers)
        .toPromise()
        .then(res => {
          const data = res.json();
          const newTodo = new Todo(data.id,data.title,data.completed);
          this.todos.push(newTodo);
        })
  }
}

export const TODO_PROVIDER: any[] = [
  TodoStore
];