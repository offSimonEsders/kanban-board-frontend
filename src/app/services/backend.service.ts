import {Injectable} from '@angular/core';
import {Todo} from "../modules/todo";
import {CreateTodo} from "../modules/create-todo";

const URL = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() {
  }

  async login(userData: object) {
    const resp = await fetch(URL + '/login/', {method: 'POST', body: JSON.stringify(userData)});
    const data = await resp.json();
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('authToken', data.token);
  }

  async register(userData: object) {
    await fetch(URL + '/register/', {method: 'POST', body: JSON.stringify(userData)});
  }

  async logout() {
    let authToken = this.getAuthToken();
    //localStorage.clear();
    await fetch(URL + '/logout/', {method: 'POST', headers: {'Authorization': `Token ${authToken}`}, body: JSON.stringify(authToken)})
  }

  async checkToken() {
    return await fetch(URL + '/checkToken/', {method: 'GET', headers: {'Authorization': `Token ${this.getAuthToken()}`}});
  }

  async getTodos() {
    return await fetch(URL + '/todos/', {method: 'GET', headers: {'Authorization': `Token ${this.getAuthToken()}`}});
  }

  async createTodo(todo: CreateTodo) {
    return await fetch(URL + '/createTodo/', {method: 'POST', headers: {'Authorization': `Token ${this.getAuthToken()}`}, body: JSON.stringify(todo)});
  }

  async deleteTodo(todo: Todo) {
    return await fetch(URL + '/delete/', {method: 'POST', headers: {'Authorization': `Token ${this.getAuthToken()}`}, body: JSON.stringify(todo.id)});
  }

  async updateTodos(todos: Todo[]) {
    return await fetch(URL + '/todos/', {
      method: 'PUT',
      headers: {'Authorization': `Token ${this.getAuthToken()}`},
      body: JSON.stringify(todos)
    });
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

}
